// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./UIntFunctions.sol";

contract Game {
    uint public participants;
    bool public allowTeams;

    constructor(uint numberOfParticipants) {
        participants = numberOfParticipants;
        allowTeams = UIntFunctions.isEven(participants);
    }
}