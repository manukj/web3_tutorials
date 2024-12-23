// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// EntryPoint contract address : 0x5FbDB2315678afecb367f032d93F642f64180aa3
// AccountFactory contract address : 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract Account is IAccount {
    uint public count = 0;
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function execute() public {
        count++;
    }

    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32,
        uint256
    ) external view returns (uint256 validationData) {
        address recovered = ECDSA.recover(
            MessageHashUtils.toEthSignedMessageHash(keccak256("hello")),
            userOp.signature
        );
        return owner == recovered ? 0 : 1; // 0 means valid signature and 1 means invalid signature
    }
}

contract AccountFactory {
    function createAccount(address owner) external returns (address) {
        Account account = new Account(owner);
        return address(account);
    }
}
