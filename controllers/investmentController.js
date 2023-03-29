const Investment = require('../models/investment')

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

//sets the maturity date
function getMaturityDate(){
    const date = new Date();
    const duration = 4; // in years
    const maturityMonth = date.getMonth() + 1;
    const maturityYear = date.getFullYear()%100 + duration;
    return `${maturityMonth}/${maturityYear}`;
}

const create_investment = async (req,res) => {
    const { InvestmentID, CustomerID, InvestmentType, Amount, startDate, MaturityDate} = req.body

    if(!InvestmentID || !CustomerID || !startDate){
        return res.status(400).json({ message: 'Invalid request body' });
    }

    const investment = new Investment({
        InvestmentID: createID(), CustomerID, InvestmentType, Amount, startDate, MaturityDate: getMaturityDate()
    })
    try {
        const newInvestment = await investment.save();
        res.status(201).json(newInvestment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const get_details = async (req, res)=>{
    let account
    try {
      account = await Investment.findOne({ CustomerID: req.params['id'] });
      console.log(account);
      if (account == null) {
        res.status(404).json({ message: "Cannot find account" });
      }
      res.json(account);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

const account_index = async (req,res) => {
    try {
        const accounts = await Investment.find();
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const update_investment_type = async (req, res)=>{
    const InvestmentType = req.body.InvestmentType;
    const InvestmentID = req.params['id'];
  
    try {
      const filter = { InvestmentID: InvestmentID };
      const update = { InvestmentType: InvestmentType};
      const options = { new: true };
      const updatedAccount = await Investment.findOneAndUpdate(filter, update, options);
      if (updatedAccount) {
        res.json(updatedAccount);
      } else {
        res.status(404).json({ message: `No account found with InvestmentID ${InvestmentID}` });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const delete_investment = async (req, res)=> {
 const CustomerID = req.params["id"];
  
    try {
      const deletedAccount = await Investment.findOneAndDelete({ InvestmentID: InvestmentID });
      if (deletedAccount) {
        res.json(deletedAccount);
      } else {
        res.status(404).json({ message: `No account found` });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    create_investment,
    get_details,
    update_investment_type,
    delete_investment,
    account_index
}