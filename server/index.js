const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const crypto=require("./scripts/crypto");

app.use(cors());
app.use(express.json());

const balances = {
  "4b1ff8bd3d734a4bd54ef0d540d84320023c9a78": 100,
  "11307d5607b3bd583aadb35aad0a8f4924d13cfd": 50,
  "0d797b0a80a0984846980a7248c0cc247c8d6403": 75,
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

  console.log("sender:",sender);

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
