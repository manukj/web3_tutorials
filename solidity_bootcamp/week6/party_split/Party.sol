// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    uint256 public amount;
    address[] public attendees;

    constructor(uint256 _amount) {
        amount = _amount;
    }

    function isAttendee(address attendee) private view returns (bool) {
        for (uint256 i = 0; i < attendees.length; i++) {
            if (attendees[i] == attendee) {
                return true;
            }
        }
        return false;
    }

    function rsvp() external payable {
        require(msg.value == amount, "Please pay the exact amount");
        require(!isAttendee(msg.sender), "You can not rsvp twice");
        attendees.push(msg.sender);
    }
}
