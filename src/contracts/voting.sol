// contracts/Voting.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Voting {
    mapping(address => bool) public hasVoted;
    mapping(bytes32 => uint256) public votes;
    bytes32[] public candidateList;

    event Voted(address indexed voter, bytes32 candidate);

    function vote(bytes32 candidate) external {
        require(!hasVoted[msg.sender], "You have already voted.");
        
        if (votes[candidate] == 0) {
            candidateList.push(candidate);
        }
        
        votes[candidate]++;
        hasVoted[msg.sender] = true;
        emit Voted(msg.sender, candidate);
    }

    function getCandidates() external view returns (bytes32[] memory) {
        return candidateList;
    }
}