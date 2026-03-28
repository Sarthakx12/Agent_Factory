// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface AgentFactoryInterface {
    function getAgent(
        uint256 id
    )
        external
        view
        returns (
            address agentOwner,
            string memory uri,
            uint256 pricePerHour,
            bool active
        );
}

/**
 * @title RentalEscrow
 * @notice Hourly rentals per (agentId, renter). Payment validated against AgentFactory price.
 *         After expiry, publisher claims; platform fee accrues for owner withdrawal.
 */
contract RentalEscrow {
    struct Rental {
        uint256 expiresAt;
        uint256 payment;
        bool claimed;
    }

    AgentFactoryInterface public immutable agentFactory;
    address public owner;
    uint256 public platformFeeBps;
    uint256 public accumulatedPlatformFees;

    uint256 public constant MAX_PLATFORM_FEE_BPS = 3000;
    uint256 public constant MAX_DURATION_HOURS = 720;
    uint256 public constant BPS_DENOMINATOR = 10000;

    mapping(uint256 => mapping(address => Rental)) public rentals;

    bool private _locked;

    event AgentRented(
        uint256 indexed agentId,
        address indexed renter,
        uint256 duration,
        uint256 payment,
        uint256 expiresAt
    );
    event RentalClaimed(
        uint256 indexed agentId,
        address indexed renter,
        address indexed publisher,
        uint256 publisherAmount,
        uint256 platformAmount
    );
    event PlatformFeeUpdated(uint256 bps);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event FeesWithdrawn(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "RentalEscrow: not owner");
        _;
    }

    modifier nonReentrant() {
        require(!_locked, "RentalEscrow: reentrant");
        _locked = true;
        _;
        _locked = false;
    }

    constructor(address _agentFactory) {
        require(_agentFactory != address(0), "RentalEscrow: zero factory");
        agentFactory = AgentFactoryInterface(_agentFactory);
        owner = msg.sender;
        platformFeeBps = 1000;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "RentalEscrow: zero owner");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function setPlatformFee(uint256 bps) external onlyOwner {
        require(bps <= MAX_PLATFORM_FEE_BPS, "RentalEscrow: fee too high");
        platformFeeBps = bps;
        emit PlatformFeeUpdated(bps);
    }

    function withdrawPlatformFees() external onlyOwner nonReentrant {
        uint256 amount = accumulatedPlatformFees;
        require(amount > 0, "RentalEscrow: no fees");
        accumulatedPlatformFees = 0;
        (bool ok, ) = payable(owner).call{value: amount}("");
        require(ok, "RentalEscrow: withdraw failed");
        emit FeesWithdrawn(owner, amount);
    }

    function getRentalCost(
        uint256 agentId,
        uint256 durationHours
    ) external view returns (uint256) {
        require(durationHours > 0 && durationHours <= MAX_DURATION_HOURS, "RentalEscrow: bad duration");
        (address agentOwner, , uint256 pricePerHour, bool active) = agentFactory.getAgent(agentId);
        require(agentOwner != address(0), "RentalEscrow: unknown agent");
        require(active, "RentalEscrow: agent inactive");
        return pricePerHour * durationHours;
    }

    function getRental(
        uint256 agentId,
        address renter
    ) external view returns (uint256 expiresAt, uint256 payment, bool claimed) {
        Rental storage r = rentals[agentId][renter];
        return (r.expiresAt, r.payment, r.claimed);
    }

    function isRentalActive(uint256 agentId, address renter) external view returns (bool) {
        Rental storage r = rentals[agentId][renter];
        return r.payment > 0 && !r.claimed && block.timestamp < r.expiresAt;
    }

    /**
     * @notice Creates or renews a rental. Prior expired rentals must be claimed by the publisher before a new rent.
     */
    function rent(uint256 agentId, uint256 durationInHours) external payable nonReentrant {
        require(durationInHours > 0 && durationInHours <= MAX_DURATION_HOURS, "RentalEscrow: bad duration");

        (address agentOwner, , uint256 pricePerHour, bool active) = agentFactory.getAgent(agentId);
        require(agentOwner != address(0), "RentalEscrow: unknown agent");
        require(active, "RentalEscrow: agent inactive");

        Rental storage r = rentals[agentId][msg.sender];
        if (r.payment > 0) {
            require(block.timestamp >= r.expiresAt, "RentalEscrow: rental active");
            require(r.claimed, "RentalEscrow: claim required");
        }

        uint256 required = pricePerHour * durationInHours;
        require(msg.value >= required, "RentalEscrow: insufficient payment");

        uint256 expiresAt = block.timestamp + durationInHours * 3600;
        r.expiresAt = expiresAt;
        r.payment = required;
        r.claimed = false;

        uint256 excess = msg.value - required;
        if (excess > 0) {
            (bool refundOk, ) = payable(msg.sender).call{value: excess}("");
            require(refundOk, "RentalEscrow: refund failed");
        }

        emit AgentRented(agentId, msg.sender, durationInHours, required, expiresAt);
    }

    /**
     * @notice Publisher pulls escrowed payment after rental end. Platform fee stays in contract until owner withdraws.
     */
    function claimRental(uint256 agentId, address renter) external nonReentrant {
        (address publisher, , , ) = agentFactory.getAgent(agentId);
        require(publisher != address(0), "RentalEscrow: unknown agent");
        require(msg.sender == publisher, "RentalEscrow: not publisher");

        Rental storage r = rentals[agentId][renter];
        require(r.payment > 0, "RentalEscrow: no rental");
        require(block.timestamp >= r.expiresAt, "RentalEscrow: not expired");
        require(!r.claimed, "RentalEscrow: already claimed");

        uint256 total = r.payment;
        uint256 platform = (total * platformFeeBps) / BPS_DENOMINATOR;
        uint256 toPublisher = total - platform;

        r.claimed = true;
        r.payment = 0;
        r.expiresAt = 0;

        accumulatedPlatformFees += platform;

        (bool okPub, ) = payable(publisher).call{value: toPublisher}("");
        require(okPub, "RentalEscrow: publisher payout failed");

        emit RentalClaimed(agentId, renter, publisher, toPublisher, platform);
    }
}
