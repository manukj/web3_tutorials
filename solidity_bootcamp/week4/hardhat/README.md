Contract deployed for the Solidity-Winner-Event challenge on the Sepolia network.
Address : 0xa7655Bb1738bF58E07b6608a49eE9e8f20083C61

```
contract Contract {
    event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}

```

Feel free to use tha above address to solve the above challenge and once done you can verify the event Winner is triggered in [Sepolia Network ](https://sepolia.etherscan.io/address/0xa7655Bb1738bF58E07b6608a49eE9e8f20083C61#events)

<img width="1396" alt="image" src="https://github.com/manukj/web3_tutorials/assets/22499119/a8ca4490-31a0-467f-9726-e315ee28db48">
