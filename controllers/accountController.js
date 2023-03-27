const Account = require("../models/account")

const account_details = async (req, res) => {
    let account;
    try {
      account = await Account.findOne({ "CustomerID": req.params['id'] });
      console.log(account);
      if (account == null) {
        res.status(404).json({ message: 'Cannot find account' });
      }
      res.json(account);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


const account_index = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const account_create = async (req, res) => {
    const { AccountNumber, IFSCCode, CustomerID, AccountType, Balance } = req.body;

    if (!AccountNumber || !IFSCCode || !CustomerID) {
        return res.status(400).json({ message: 'Invalid request body' });
    }

    const account = new Account({
        AccountNumber,
        IFSCCode,
        CustomerID,
        AccountType,
        Balance
    });

    try {
        const newAccount = await account.save();
        res.status(201).json(newAccount);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const account_update = async (req, res) => {
    const CustomerID = req.params['id'];
    const AccountNumber = req.body.AccountNumber;
    const IFSCCode = req.body.IFSCCode;
    const AccountType = req.body.AccountType;
    const Balance = req.body.Balance;
  
    try {
      const filter = { CustomerID: CustomerID };
      const update = { AccountNumber: AccountNumber, IFSCCode: IFSCCode, AccountType: AccountType, Balance: Balance };
      const options = { new: true };
      const updatedAccount = await Account.findOneAndUpdate(filter, update, options);
      if (updatedAccount) {
        res.json(updatedAccount);
      } else {
        res.status(404).json({ message: `No customer found with CustomerID ${CustomerID}` });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const account_delete = async (req, res) => {
    const CustomerID = req.params['id'];
  
    try {
      const deletedAccount = await Account.findOneAndDelete({ CustomerID: CustomerID });
      if (deletedAccount) {
        res.json(deletedAccount);
      } else {
        res.status(404).json({ message: `No account found with CustomerID ${customerId}` });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
}
  

// const account_details = (getAccount, async (req, res) => {
//     res.json(res.account);
// });

module.exports = {
    account_index,
    account_create,
    account_details,
    account_update,
    account_delete
}