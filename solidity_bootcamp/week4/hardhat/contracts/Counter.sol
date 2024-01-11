// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Counter {
    uint public count = 0;

    function increment() public {
        count += 1;
    }
}
