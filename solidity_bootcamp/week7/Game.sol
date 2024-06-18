// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./UIntFunctions.sol";

contract Game {
    uint public participants;
    bool public allowTeams;
    using UIntFunctions for uint;

    constructor(uint numberOfParticipants) {
        participants = numberOfParticipants;
        allowTeams = participants.isEven();
    }
}