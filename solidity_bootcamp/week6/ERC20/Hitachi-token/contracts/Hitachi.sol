// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Hitachi is ERC20 {
    uint constant _initial_supply = 100 * (10 **18);
    constructor() ERC20("Hitachi", "HIT") {
        _mint(msg.sender, _initial_supply);
    }
}
