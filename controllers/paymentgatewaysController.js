const Account = require("../models/account");

const { Payment_Insurance,
  Payment_Investments,
  Payment_MutualFunds,
  Payment_Transactions } = require("../models/paymentgateways")

const initialise_transaction = async(req,res)=>{
    try{
    const [
      sender: AccountNumber, IFSCCode, CustomerName ,
      receiver:  AccountNumber, IFSCCode, CustomerName ,
      paymentAmount,
     ] = req.body;
}
catch(err){
    console.log(err)
}
}  

const initialise_insurance = async(req,res)=>{
    try {
        const {AccountNumber,IFSCCode,CustomerName,InsuranceID} = req.body;
        
        const ans = await Account.findOne({AccountNumber: req.body.AccountNumber})
        if (!ans) {
          throw Error("No Account found!");
        }
    } 
    catch (err) {
      console.log(err);
    }

}