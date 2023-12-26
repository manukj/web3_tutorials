const express = require("express");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "035a3c7e8223faa3bcedd1af9d3aaffdd41bb71065389bb0de9f03f7eaf6eed696": 100, // associate Private Key : 7030df5a6450baa3cb3dc768c44ea0e721b8c26d86f6811a908b6792ae546898
  "034195d86b9c160989d974a33596a509a06cc7bf296ccdbe34b324ca4a18a1b3b1": 50, // associated Private key : 7d09aebbddb3f2661bad910a4611aa79af06c6d030ca6cc1bb68374a49110aba
  "02fde88876eedc449806622f1c8ac797122f04e3811fbbc97584be0ad57eb0a55c": 75, // associated Private key : 0fa0bf008a2136d4ad35b05e7005480da66392c6a6c1a14666f7b7b6934cbd3d
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { recipient, amount, signature, recoverBit } = req.body;

  const recoveredSignature = secp256k1.Signature.fromCompact(signature);
  recoveredSignature.recovery = recoverBit;
  const hashedMessage = keccak256(utf8ToBytes("Amount:" + amount));
  const sender = recoveredSignature.recoverPublicKey(hashedMessage).toHex();
  console.log("sender", sender);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
