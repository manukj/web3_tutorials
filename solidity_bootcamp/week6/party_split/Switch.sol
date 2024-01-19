// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {
    address payable public recepient;
    address public owner;
    uint256 public timestamp;

    constructor(address _recepient) payable {
        recepient = payable(_recepient);
        owner = msg.sender;
        timestamp = block.timestamp;
    }

    function withdraw() external {
        require(
            block.timestamp >= timestamp + 53 weeks,
            "You have to wait 53 week"
        );
        (bool success, ) = recepient.call{value: address(this).balance}("");
        require(success, "Payment failed");
    }

    function ping() external payable {
        require(owner == msg.sender, "You are not the owner");
        timestamp = block.timestamp;
    }
}
