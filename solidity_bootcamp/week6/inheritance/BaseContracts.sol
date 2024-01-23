// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }
}

contract Transferable is Ownable {
    function transfer(address _transferAddress) external onlyOwner {
        owner = _transferAddress;
    }
}
