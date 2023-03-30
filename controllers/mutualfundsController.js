const Customer = require("../models/customer");
const MutualFunds = require("../models/mutualfunds");

function createID() {
  const alpha_numeric = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
  ];
  let id = "";
  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * 18);
    id += alpha_numeric[index];
  }
  return id;
}

const create_mutualfunds = async (req, res) => {
  try {
    const {
      MutualFundsID,
      CustomerID,
      MutualFundsName,
      Amount,
      PoolDescription,
    } = req.body;

    if (!MutualFundsName || !CustomerID) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const ans = await Customer.findOne({ CustomerID: req.body.CustomerID });
    if (!ans) {
      throw Error("No customer found. Please create new customer!");
    }

    const mutualfunds = new MutualFunds({
      MutualFundsID: createID(),
      CustomerID,
      MutualFundsName,
      Amount,
      PoolDescription,
    });

    const new_mutualfunds = await mutualfunds.save();
    res.status(201).json(new_mutualfunds);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const update_mutualfunds = async (req, res) => {
  
  try {
    const Amount = req.body.Amount;
    const MutualFundsID = req.body.MutualFundsID;
    const filter = { MutualFundsID: MutualFundsID };
    const update = { Amount: Amount };
    const options = { new: true };
    const updatedAccount = await MutualFunds.findOneAndUpdate(
      filter,
      update,
      options
    );
    if (updatedAccount) {
      res.json(updatedAccount);
    } else {
      res.status(404).json({
        message: `No account found`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const account_index = async (req, res) => {
  try {
    const accounts = await MutualFunds.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  update_mutualfunds,
  create_mutualfunds,
  account_index,
};
