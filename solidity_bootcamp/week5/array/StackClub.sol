// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract StackClub {
    address[] members;

    constructor() {
        members.push(msg.sender);
    }

    function addMember(address member) public {
        require(isMember(msg.sender), "Non member cannot add");
        members.push(member);
    }

    function removeLastMember() public {
        require(isMember(msg.sender), "No members to remove");
        members.pop();
    }

    function isMember(address member) public view returns (bool) {
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == member) {
                return true;
            }
        }
        return false;
    }
}
