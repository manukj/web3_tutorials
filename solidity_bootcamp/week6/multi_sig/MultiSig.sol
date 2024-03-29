// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    struct Transaction {
        address destination;
        uint256 value;
        bool executed;
        bytes data;
    }

    address[] public owners;
    uint256 public required;
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(address => bool)) public confirmations;
    uint256 public transactionCount;

    constructor(address[] memory _addresses, uint256 _required) {
        require(_addresses.length >= _required, "Invalid number of owners");
        require(_required > 0, "Required cannot be 0");
        owners = _addresses;
        required = _required;
    }

    function addTransaction(
        address _destination,
        uint256 _value,
        bytes memory _data
    ) internal returns (uint256) {
        transactions[transactionCount] = Transaction({
            destination: _destination,
            value: _value,
            executed: false,
            data: _data
        });
        transactionCount += 1;
        return transactionCount - 1;
    }

    function confirmTransaction(uint256 _transactionId) public {
        require(isOwner(msg.sender), "Not an owner");
        require(
            confirmations[_transactionId][msg.sender] == false,
            "Transaction already confirmed"
        );
        confirmations[_transactionId][msg.sender] = true;
        if (isConfirmed(_transactionId)) {
            executeTransaction(_transactionId);
            (_transactionId);
        }
    }

    function isOwner(address _address) internal view returns (bool) {
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function getConfirmationsCount(
        uint256 _transactionId
    ) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if (confirmations[_transactionId][owners[i]] == true) {
                count += 1;
            }
        }
        return count;
    }

    function submitTransaction(
        address _destination,
        uint256 _value,
        bytes memory _data
    ) public {
        uint256 transactionId = addTransaction(_destination, _value, _data);
        confirmTransaction(transactionId);
    }

    function isConfirmed(uint transcationId) public view returns (bool) {
        return getConfirmationsCount(transcationId) >= required;
    }

    function executeTransaction(uint transcationId) public {
        require(isConfirmed(transcationId), "Transaction not confirmed");
        Transaction storage transaction = transactions[transcationId];
        require(!transaction.executed, "Transaction already executed");
        transaction.executed = true;
        (bool success, ) = transaction.destination.call{
            value: transaction.value
        }(transaction.data);
        require(success, "Transaction failed");
    }

    receive() external payable {}
}
