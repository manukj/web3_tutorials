// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "./IERC20.sol";

contract Chest {
    
    function plunder(address[] memory tokenAddresses) external {
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
           IERC20 token = IERC20(tokenAddresses[i]);
           token.transfer(msg.sender, token.balanceOf(address(this)));
        }
    }
}
