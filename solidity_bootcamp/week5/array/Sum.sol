// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function sum(uint[] memory array) public pure returns (uint256) {
        uint sumVariable = 0;
        for (uint i = 0; i < array.length; i++) {
            sumVariable += array[i];
        }
        return sumVariable;
    }
}
