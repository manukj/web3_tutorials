const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(data) {
    this.data = data;
  }

  toHash() {
    return SHA256(this.previousHash + this.data); // a hash!
  }
}

module.exports = Block;
