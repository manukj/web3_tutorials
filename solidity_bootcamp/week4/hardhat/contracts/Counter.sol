// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Counter {
    uint public count;

    constructor(uint _count) {
        count = _count;
    }

    function increment() public {
        count += 1;
    }
}
