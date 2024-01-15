// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    address owner;
    uint price;
    event Deployed(address _address);
    event Transfer(address, address);

    constructor() {
        owner = msg.sender;
        emit Deployed(msg.sender);
    }

    function transfer(address recipient) external {
        require(msg.sender == owner);
        owner = recipient;
        emit Transfer(msg.sender, recipient);
    }

    event ForSale(uint, uint);

    function markPrice(uint _price) external {
        require(msg.sender == owner);
        price = _price;
        emit ForSale(price, block.timestamp);
    }
}
