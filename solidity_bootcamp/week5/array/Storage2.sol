// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function filterEven(
        uint[] calldata array
    ) public pure returns (uint[] memory) {
        uint count = 0;
        for (uint i = 0; i < array.length; i++) {
            if (array[i] % 2 == 0) {
                count++;
            }
        }
        uint[] memory evenNumbers = new uint[](count);
        uint index = 0;
        for (uint i = 0; i < array.length; i++) {
            if (array[i] % 2 == 0) {
                evenNumbers[index] = array[i];
                index++;
            }
        }
        return evenNumbers;
    }
}
