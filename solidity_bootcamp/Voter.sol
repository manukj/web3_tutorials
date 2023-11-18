// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    enum VoterState {
        Absent,
        Yes,
        No
    }

    struct Proposal {
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
        mapping(address => VoterState) voterState;
    }

    struct Vote {
        uint proposalId;
        bool vote;
    }

    Proposal[] public proposals;

    function newProposal(address target, bytes memory data) external {
        Proposal storage proposal = proposals.push();
        proposal.target = target;
        proposal.data = data;
    }

    function castVote(uint proposalId, bool vote) external {
        Proposal storage proposal = proposals[proposalId];
        //clearning the previous vote
        if (proposal.voterState[msg.sender] == VoterState.Yes) {
            proposal.yesCount--;
        }
        if (proposal.voterState[msg.sender] == VoterState.No) {
            proposal.noCount--;
        }

        // update vote
        if (vote) {
            proposal.yesCount++;
        } else {
            proposal.noCount++;
        }

        //update the status
        proposal.voterState[msg.sender] = vote ? VoterState.Yes : VoterState.No;
    }
}
