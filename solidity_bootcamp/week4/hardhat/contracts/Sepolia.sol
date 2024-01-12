// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Sepolia {
    function withdraw(uint _amount) public payable {
        require(_amount <= 0.1 ether);
        payable(msg.sender).transfer(_amount);
    }

    //fallback function
    receive() external payable {}
}
