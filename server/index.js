const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const crypto=require("./scripts/crypto");

app.use(cors());
app.use(express.json());

const balances = {
  "03815bf0ec559946a5a598128f7129bad86288fa": 100,
  "f058b5fa6012ebdec2a3959724e29c72c532e0ac": 50,
  "22c4c7765a52fb30d87424944bee413702fbdad7": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // const { sender, recipient, amount } = req.body;
  const {message,signature}=req.body;
  const {recipient,amount}=message;

  const publicKey=crypto.recoverPublicKey(message, signature);

  const sender = crypto.pubKeyToAddress(publicKey);

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
