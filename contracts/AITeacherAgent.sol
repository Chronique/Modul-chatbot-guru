// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AITeacherAgent
 * @dev Implementation of a verifiable AI Agent based on ERC-8004 concepts.
 */
contract AITeacherAgent {
    
    struct AgentProfile {
        string name;
        string specialization;
        uint256 trustScore;
        address operator;
        bool isActive;
    }

    mapping(uint256 => AgentProfile) public agents;
    uint256 public totalAgents;

    event AgentInitialized(uint256 indexed agentId, string name, address indexed operator);
    event JobValidated(uint256 indexed agentId, string taskDescription, uint256 newTrustScore);

    /**
     * @notice Registers a new AI Teacher Agent on the blockchain.
     */
    function initializeAgent(string memory _name, string memory _specialization) public {
        totalAgents++;
        agents[totalAgents] = AgentProfile({
            name: _name,
            specialization: _specialization,
            trustScore: 0,
            operator: msg.sender,
            isActive: true
        });
        
        emit AgentInitialized(totalAgents, _name, msg.sender);
    }

    /**
     * @notice Records a successful grading task to increase agent reputation.
     */
    function validateGradingTask(uint256 _agentId) public {
        require(msg.sender == agents[_agentId].operator, "Unauthorized: Only operator can validate");
        agents[_agentId].trustScore += 1;
        
        emit JobValidated(_agentId, "STUDENT_GRADING", agents[_agentId].trustScore);
    }
}