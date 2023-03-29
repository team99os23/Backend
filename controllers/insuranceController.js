const Insurance = require('../models/insurance')

//creates a random string of 10 characters
function createID(){
    const alpha_numeric = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H"]
    let id = ""
    for(let i=0;i<10;i++){
        const index = Math.floor(Math.random()*18);
        id+=alpha_numeric[index]
    }
    return id
}

const create_insurance = async (req, res) => {
  const {
    CustomerID,
    InsuranceType,
    InsuranceName,
    Description,
    MonthlyInstallment,
    Maturity
  } = req.body;

  if (!InsuranceID || !CustomerID || !InsuranceName) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const insurance = new Insurance({
    InsuranceID: createID(),
    CustomerID,
    InsuranceType,
    InsuranceName,
    Description,
    MonthlyInstallment,
    Maturity
  });
  try {
    const newInsurance = await insurance.save();
    res.status(201).json(newInsurance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const get_details = async (req, res) => {
  let account;
  try {
    account = await Insurance.findOne({ InsuranceID: req.body.InsuranceID });
    console.log(account);
    if (account == null) {
      res.status(404).json({ message: "Cannot find account" });
    }
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const account_index = async (req, res) => {
  try {
    const accounts = await Insurance.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update_insurance_type = async (req, res) => {
  const InsuranceType = req.body.InsuranceType;
  const InsuranceID = req.body.InsuranceID;

  try {
    const filter = { InsuranceID: InsuranceID };
    const update = { InsuranceType: InsuranceType };
    const options = { new: true };
    const updatedAccount = await Insurance.findOneAndUpdate(
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

const delete_insurance = async (req, res) => {
  const CustomerID = req.params['id'];

  try {
    const deletedAccount = await Insurance.findOneAndDelete({
      CustomerID: CustomerID,
    });
    if (deletedAccount) {
      res.json(deletedAccount);
    } else {
      res
        .status(404)
        .json({
          message: `No account found`,
        });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  create_insurance,
  get_details,
  update_insurance_type,
  delete_insurance,
  account_index,
};