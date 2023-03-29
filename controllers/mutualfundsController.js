const MutualFunds = require("../models/mutualfunds");

const create_mutualfunds = async (req, res) => {
  const {
    MutualFundsID,
    CustomerID,
    MutualFundsName,
    Amount,
    PoolDescription,
  } = req.body;

  if (!MutualFundsName || !MutualFundsID || !CustomerID) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const mutualfunds = new MutualFunds({
    MutualFundsID,
    CustomerID,
    MutualFundsName,
    Amount,
    PoolDescription,
  });

  try {
    const new_mutualfunds = await mutualfunds.save();
    res.status(201).json(new_mutualfunds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update_mutualfunds = async (req, res) => {
  const Amount = req.body.Amount;
  const MutualFundsID = req.params['id'];

  try {
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
      res
        .status(404)
        .json({
          message: `No account found`
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
  account_index
};
