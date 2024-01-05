const { utils, providers, Wallet } = require("ethers");
const { ganacheProvider } = require("./config");

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Donate at least 1 ether from the wallet to each charity
 * @param   {string} a hex string private key for a wallet with 10 ETH
 * @param   {array} an array of ethereum charity addresses
 *
 * @returns {Promise} a promise that resolves after all donations have been sent
 */
async function donate(privateKey, charities) {
  var wallet = new Wallet(privateKey, provider);
  var oneEther = utils.parseUnits("1", "ether");
  for (let i = 0; i < charities.length; i++) {
    await wallet.sendTransaction({
      value: oneEther,
      to: charities[i],
    });
  }
}

module.exports = donate;
