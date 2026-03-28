// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgentFactory {
    struct Agent {
        address owner;
        string storageURI;
        uint256 pricePerHour;
        bool active;
        uint256 publishFeePaid;
    }

    address public owner;
    mapping(uint256 => Agent) public agents;
    uint256 public agentCount;
    uint256 public publishFee;

    bool private _locked;

    event AgentPublished(
        uint256 indexed id,
        address indexed agentOwner,
        string uri,
        uint256 pricePerHour
    );
    event AgentUpdated(uint256 indexed id, string uri, uint256 pricePerHour);
    event AgentDeactivated(uint256 indexed id);
    event AgentReactivated(uint256 indexed id);
    event PublishFeeUpdated(uint256 newFee);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event FeesWithdrawn(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "AgentFactory: not owner");
        _;
    }

    modifier nonReentrant() {
        require(!_locked, "AgentFactory: reentrant");
        _locked = true;
        _;
        _locked = false;
    }

    modifier onlyAgentOwner(uint256 id) {
        require(agents[id].owner == msg.sender, "AgentFactory: not agent owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        publishFee = 0.1 ether;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "AgentFactory: zero owner");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function setPublishFee(uint256 newFee) external onlyOwner {
        publishFee = newFee;
        emit PublishFeeUpdated(newFee);
    }

    function withdrawFees() external onlyOwner nonReentrant {
        uint256 bal = address(this).balance;
        require(bal > 0, "AgentFactory: no fees");
        (bool ok, ) = payable(owner).call{value: bal}("");
        require(ok, "AgentFactory: withdraw failed");
        emit FeesWithdrawn(owner, bal);
    }

    /**
     * @param uri Off-chain metadata URI (e.g. IPFS).
     * @param pricePerHour Wei charged per hour for rentals (validated by RentalEscrow).
     */
    function publishAgent(
        string calldata uri,
        uint256 pricePerHour
    ) external payable nonReentrant returns (uint256 id) {
        require(bytes(uri).length > 0, "AgentFactory: empty uri");
        require(pricePerHour > 0, "AgentFactory: invalid price");
        require(msg.value >= publishFee, "AgentFactory: insufficient publish fee");

        id = ++agentCount;
        agents[id] = Agent({
            owner: msg.sender,
            storageURI: uri,
            pricePerHour: pricePerHour,
            active: true,
            publishFeePaid: publishFee
        });

        uint256 excess = msg.value - publishFee;
        if (excess > 0) {
            (bool refundOk, ) = payable(msg.sender).call{value: excess}("");
            require(refundOk, "AgentFactory: refund failed");
        }

        emit AgentPublished(id, msg.sender, uri, pricePerHour);
    }

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
        )
    {
        Agent storage a = agents[id];
        require(a.owner != address(0), "AgentFactory: unknown agent");
        return (a.owner, a.storageURI, a.pricePerHour, a.active);
    }

    function isAgentActive(uint256 id) external view returns (bool) {
        Agent storage a = agents[id];
        return a.owner != address(0) && a.active;
    }

    function updateAgent(
        uint256 id,
        string calldata uri,
        uint256 pricePerHour
    ) external onlyAgentOwner(id) {
        require(bytes(uri).length > 0, "AgentFactory: empty uri");
        require(pricePerHour > 0, "AgentFactory: invalid price");
        agents[id].storageURI = uri;
        agents[id].pricePerHour = pricePerHour;
        emit AgentUpdated(id, uri, pricePerHour);
    }

    function deactivateAgent(uint256 id) external onlyAgentOwner(id) {
        agents[id].active = false;
        emit AgentDeactivated(id);
    }

    function reactivateAgent(uint256 id) external onlyAgentOwner(id) {
        agents[id].active = true;
        emit AgentReactivated(id);
    }
}
