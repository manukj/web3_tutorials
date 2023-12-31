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
    mapping(address => bool) eligibleCandidate;

    event ProposalCreated(uint);
    event VoteCast(uint, address);

    constructor(address[] memory _eligible) {
        eligibleCandidate[msg.sender] = true;
        for (uint i = 0; i < _eligible.length; i++) {
            eligibleCandidate[_eligible[i]] = true;
        }
    }

    function newProposal(
        address target,
        bytes memory data
    ) external isEligible {
        Proposal storage proposal = proposals.push();
        proposal.target = target;
        proposal.data = data;
        emit ProposalCreated(proposals.length - 1);
    }

    function castVote(uint proposalId, bool vote) external isEligible {
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
        emit VoteCast(proposalId, msg.sender);

        if (proposal.yesCount >= 10) {
            (bool success, ) = proposal.target.call(proposal.data);
            require(success);
        }
    }

    modifier isEligible() {
        require(eligibleCandidate[msg.sender]);
        _;
    }
}
