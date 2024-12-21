// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    enum VoteStatus {
        NotVoted,
        Yes,
        No
    }
    struct Proposal {
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
        mapping(address => VoteStatus) voter;
        bool executed;
    }
    event ProposalCreated(uint proposalId);
    event VoteCast(uint proposalId, address voter);
    struct Voter {
        address voterAddress;
        bool vote;
    }

    Proposal[] public proposals;
    address[] public memebers;

    constructor(address[] memory _voters) {
        memebers = _voters;
        memebers.push(msg.sender);
    }

    function newProposal(address _target, bytes calldata _data) external {
        require(isMemeber(msg.sender), "Sender is not a valid Member.");
        Proposal storage proposal = proposals.push();
        proposal.target = _target;
        proposal.data = _data;
        emit ProposalCreated(proposals.length - 1);
    }

    function isMemeber(address _address) internal view returns (bool) {
        for (uint i = 0; i < memebers.length; i++) {
            if (memebers[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function castVote(uint _proposalId, bool _vote) external {
        require(isMemeber(msg.sender), "Sender is not a valid Member.");
        Proposal storage proposal = proposals[_proposalId];
        if (proposal.voter[msg.sender] == VoteStatus.NotVoted) {
            if (_vote) {
                proposal.yesCount++;
                proposal.voter[msg.sender] = VoteStatus.Yes;
            } else {
                proposal.noCount++;
                proposal.voter[msg.sender] = VoteStatus.No;
            }
        } else {
            if (proposal.voter[msg.sender] == VoteStatus.Yes && !_vote) {
                proposal.yesCount--;
                proposal.noCount++;
                proposal.voter[msg.sender] = VoteStatus.No;
            } else if (proposal.voter[msg.sender] == VoteStatus.No && _vote) {
                proposal.yesCount++;
                proposal.noCount--;
                proposal.voter[msg.sender] = VoteStatus.Yes;
            }
        }
        emit VoteCast(_proposalId, msg.sender);
        if (proposal.yesCount >= 10 && !proposal.executed) {
            (bool success, ) = proposal.target.call(proposal.data);
            require(success, "Transaction failed.");
            proposal.executed = true;
        }
    }
}
