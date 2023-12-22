const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());
  
const balances = {
  "03ad4bd2174f9c8dba4b96568c62ae9b0c686fa1ada5cb3730aaa481258baeb339": 100, // associate Private Key : a809a837b238c79c1c5f8508cea3dc4a0e63bd772afb3bc03dd2a4907a842b5b
  "023832d4deaf8dcacdc4d87c7d0ee48d18630953696e6e4d65d9a52a6b171af53a": 50, // associated Private key : 794d83e71e73b2a28f36b107c391c16a031be012e82600bd13a60eda155e2276
  "03aa7c329a3a65a03ec6fa9ba14c0e37096720e17e3dcfc89454a0b17f3bf94689": 75, // associated Private key : fb9212023c39239aba1e24b59da045d68778d0474dd6ab80b5fc476aeffddf82
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

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
