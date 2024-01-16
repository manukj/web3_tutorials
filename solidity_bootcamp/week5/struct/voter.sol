// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    enum Choices {
        Yes,
        No,
        NotVoted
    }

    struct Vote {
        Choices choice;
        address voter;
    }

    Vote[] public votes;

    function createVote(Choices choice) external {
        require(!hasVoted(msg.sender));
        votes.push(Vote(choice, msg.sender));
    }

    function findChoice(address voter) public view returns (Choices) {
        for (uint i = 0; i < votes.length; i++) {
            if (votes[i].voter == voter) {
                return votes[i].choice;
            }
        }
        return Choices.NotVoted;
    }

    function hasVoted(address voter) public view returns (bool) {
        Choices choice = findChoice(voter);
        return choice != Choices.NotVoted;
    }

    function changeVote(Choices choice) external {
        require(hasVoted(msg.sender));
        for (uint i = 0; i < votes.length; i++) {
            if (votes[i].voter == msg.sender) {
                votes[i].choice = choice;
            }
        }
    }
}
