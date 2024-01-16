// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    uint[] public evenNumbers;

    function filterEven(uint[] memory array) external returns (uint[] memory) {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] % 2 == 0) {
                evenNumbers.push(array[i]);
            }
        }
        return evenNumbers;
    }
    
}
