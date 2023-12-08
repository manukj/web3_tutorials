const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const restOfPublicKey = publicKey.slice(1, );
    const hashedPublicKey = keccak256(restOfPublicKey);
    return hashedPublicKey.slice(-20);
}

module.exports = getAddress;