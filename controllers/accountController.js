const Account = require("../models/account");

const create_account = async (req, res) => {

    try {
        const existingAccount = await Account.findOne({AccountNumber : req.body.AccountNumber});
        const existingAccountCheck = existingAccount ? true : false;
    
        if(!existingAccountCheck){
            const account = new Account(req.body);
            account.save()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
                console.log(err);
            })
        }
        else{
            res.send("ACCOUNT ALREADY EXISTS");
        }
    }
    catch (err) {
        console.log(err);
    }
}

const get_details = (req, res) => {
    Account.findOne({ AccountNumber: req.body.AccountNumber, IFSCCode: req.body.IFSCCode })
        .then((result) => {
            if (result) res.send(result);
            else res.send("Could Not Find Record");
        })
        .catch((err) => {
            res.send(err);
            console.log(err);
        })
}

const update_account_type = (req, res) => {
    Account.updateOne({ AccountNumber: req.body.AccountNumber, IFSCCode: req.body.IFSCCode }, { AccountType: req.body.AccountType })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
            console.log(err);
        })
}


module.exports = {
    create_account,
    get_details,
    update_account_type
}