// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Contract.sol";

contract WinnerAttempt {
    function attempt(address contractAddress) public {
        Contract(contractAddress).attempt();
    }
}
