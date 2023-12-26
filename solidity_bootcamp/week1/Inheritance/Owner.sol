// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Ownable {
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
}

contract Transferable is  Ownable{

    function transfer(address newAddress) external onlyOwner {
        owner = newAddress;
    }
}
