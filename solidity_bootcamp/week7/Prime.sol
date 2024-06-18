// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Prime {
    function dividesEvenly(uint256 _num, uint256 _denom) public pure returns(bool) {
        return _num % _denom == 0;
    }

    function isPrime(uint256 _num) public pure returns(bool) {
        if (_num < 2) {
            return false;
        }
        for (uint256 i = 2; i < _num; i++) {
            if (dividesEvenly(_num, i)) {
                return false;
            }
        }
        return true;
    }
}