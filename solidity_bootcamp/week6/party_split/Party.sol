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

    function payBill(address venue, uint256 totalAmount) external {
        (bool success, ) = payable(venue).call{value: totalAmount}("");
        require(success, "Payment failed");
        uint256 splitBalance = address(this).balance / attendees.length;
        for (uint256 i = 0; i < attendees.length; i++) {
            (success, ) = payable(attendees[i]).call{value: splitBalance}("");
            require(success, "Payment failed");
        }
    }
}
