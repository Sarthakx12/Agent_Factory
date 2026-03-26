// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgentFactory {
    struct Agent {
        address owner;
        string storageURI;
        uint256 publishFee;
    }
    
    mapping(uint256 => Agent) public agents;
    uint256 public agentCount;
    uint256 public constant PUBLISH_FEE = 0.1 ether; // 0.1 MON
    
    event AgentPublished(uint256 indexed id, address owner, string uri);
    
    function publishAgent(string memory _uri) external payable returns (uint256) {
        require(msg.value >= PUBLISH_Fee, "Insufficient publish fee");
        uint256 id = ++agentCount;
        agents[id] = Agent(msg.sender, _uri, msg.value);
        emit AgentPublished(id, msg.sender, _uri);
        return id;
    }
}