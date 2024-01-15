// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    address owner;
    uint price;
    bool forSale;
    event Deployed(address _address);
    event Transfer(address, address);
    event ForSale(uint, uint);
    event Purchase(uint, address);

    constructor() {
        owner = msg.sender;
        emit Deployed(msg.sender);
    }

    function transfer(address recipient) public {
        require(msg.sender == owner);
        owner = recipient;
        emit Transfer(msg.sender, recipient);
    }

    function markPrice(uint _price) external {
        require(msg.sender == owner);
        price = _price;
        emit ForSale(price, block.timestamp);
    }

    function purchase() external payable {
        require(msg.value == price, "1");
        require(price > 0, "2");
        //transfer the amount to msg.sender first;
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "transction failed");
        // transfer the ownership
        owner = msg.sender;
        // make it not for sale
        price = 0;
        emit Purchase(msg.value, msg.sender);
    }
}
