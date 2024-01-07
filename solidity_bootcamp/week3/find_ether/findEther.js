const { providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

async function findEther(address) {
    const addresses = [];
    const blockNumber = await provider.getBlockNumber(); // get the latest block number
    for (let i = 0; i <= blockNumber; i++) {
        const block = await provider.getBlockWithTransactions(i); // get transactions in each block
        block.transactions.forEach((tx) => {
            if (tx.from === address) { // check if the address is the sender
                addresses.push(tx.to);
            }
        });
    }
    return addresses;
}

module.exports = findEther;