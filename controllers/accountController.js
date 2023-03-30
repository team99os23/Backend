const Account = require("../models/account");

const create_account = (req, res) => {

    console.log(req.body);

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

const get_details = (req, res) => {
    Account.find({ AccountNumber: req.body.AccountNumber, IFSCCode: req.body.IFSCCode })
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