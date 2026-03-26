// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalEscrow {
    struct Rental {
        uint256 agentId;
        address renter;
        uint256 expiresAt;
        uint256 payment;
    }
    
    mapping(bytes32 => Rental) public rentals;
    
    event AgentRented(uint256 indexed agentId, address renter, uint256 duration);
    
    function rent(uint256 agentId, uint256 hours) external payable {
        bytes32 rentalId = keccak256(abi.encode(agentId, msg.sender, block.timestamp));
        rentals[rentalId] = Rental(agentId, msg.sender, block.timestamp + (hours * 3600), msg.value);
        emit AgentRented(agentId, msg.sender, hours);
    }
    
    function isRentalActive(uint256 agentId, address renter) external view returns (bool) {
        bytes32 rentalId = keccak256(abi.encode(agentId, renter, block.timestamp));
        return rentals[rentalId].expiresAt > block.timestamp;
    }
}