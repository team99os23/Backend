const Account = require("../models/account");
const Customer = require("../models/customer");
const MutualFund = require("../models/mutualfunds");
const Investment = require("../models/investment");
const Insurance = require("../models/insurance");

const initialise_transaction = async (req, res) => {
    try {
        // validate both accounts
        const senderAccountSearchParams = {
            AccountNumber: req.body.sender.AccountNumber,
            IFSCCode: req.body.sender.IFSCCode
        };
        const receiverAccountSearchParams = {
            AccountNumber: req.body.receiver.AccountNumber,
            IFSCCode: req.body.receiver.IFSCCode
        };

        const senderAccount = await Account.findOne(senderAccountSearchParams);
        const receiverAccount = await Account.findOne(receiverAccountSearchParams);

        const senderCustomerDetailsParams = {
            CustomerID: senderAccount ? senderAccount.CustomerID : ""
        };
        const receiverCustomerDetailsParams = {
            CustomerID: receiverAccount ? receiverAccount.CustomerID : ""
        };

        const senderCustomer = await Customer.findOne(senderCustomerDetailsParams);
        const receiverCustomer = await Customer.findOne(receiverCustomerDetailsParams);

        const senderAccountCheck = senderAccount ? true : false;
        const receiverAccountCheck = receiverAccount ? true : false;

        const senderNameCheck = req.body.sender.CustomerName.toLowerCase() ===(senderCustomer ? senderCustomer.Name : "").toLowerCase() ? true : false;

        const receiverNameCheck = req.body.receiver.CustomerName.toLowerCase() === (receiverCustomer ? receiverCustomer.Name : "").toLowerCase() ? true : false;

        const paymentAmount = req.body.paymentAmount;
        // upper limit check on amount can also be employed
        const paymentAmountCheck = paymentAmount > 0 && senderAccount ? senderAccount.Balance >= paymentAmount : false;

        const proceedPayment = paymentAmountCheck && senderAccountCheck && receiverAccountCheck && senderNameCheck && receiverNameCheck;

        // update balance after validation
        if (proceedPayment) {
            Account.updateOne(senderAccountSearchParams, {Balance: senderAccount.Balance - paymentAmount})
            .then((resultSender) => {
                Account.updateOne(receiverAccountSearchParams, {Balance: receiverAccount.Balance + paymentAmount})
                .then((resultReciver) => {
                    res.send("Payment Successful");
                })
                .catch((err) => {
                    console.log(err);
                    // can revert changes made to senders account
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else {
            res.send("Condition Not Passed");
        }
    } catch (err) {
        console.log(err);
    }
};

const initialise_investment = async (req, res) => {
    try {
        // parameters for searching the account
        const accountSearchParams = {
            AccountNumber: req.body.AccountNumber,
            IFSCCode: req.body.IFSCCode
        };
        // searching for account and waiting till we get it
        const account = await Account.findOne(accountSearchParams);

        // fetching customer details for name matching
        const customerDetailsParams = {
            CustomerID: account ? account.CustomerID : ""
        };
        const customer = await Customer.findOne(customerDetailsParams);

        // finding the Investment Plan in which the amount has to be deposited
        const investmentSearchParams = {
            CustomerID: account ? account.CustomerID : "",
            InvestmentId: req.body.InvestmentId
        };
        const investment = await Investment.findOne(investmentSearchParams);

        // amount to be added to investment
        const paymentAmount = req.body.paymentAmount;

        // individual checks over various parameters
        const paymentAmountCheck = paymentAmount > 0 && account ? account.Balance >= paymentAmount : false;
        const accountCheck = account ? true : false;
        const nameCheck = req.body.CustomerName.toLowerCase() === (customer ? customer.Name : "").toLowerCase() ? true : false;
        const investmentCheck = investment ? true : false;

        // combining all different checks together
        const proceedPayment = paymentAmountCheck && accountCheck && nameCheck && investmentCheck;

        // making changes in database to finalise payment
        if (proceedPayment) {
            Account.updateOne(accountSearchParams, {Balance: account.Balance - paymentAmount})
            .then((resultAccount) => {
                Investment.updateOne(investmentSearchParams, {Amount: investment.Amount + paymentAmount})
                .then((resultInvestment) => {
                    res.send("Deposit Successful");
                })
                .catch((err) => {
                    // can revert changes made on account
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else {
            res.send("Condition Not Passed");
        }
    } catch (err) {
        console.log(err);
    }
};

const initialise_mutual_fund = async (req, res) => {
    try {
        // parameters for searching the account
        const accountSearchParams = {
            AccountNumber: req.body.AccountNumber,
            IFSCCode: req.body.IFSCCode
        };
        // searching for account and waiting till we get it
        const account = await Account.findOne(accountSearchParams);

        // fetching customer details for name matching
        const customerDetailsParams = {
            CustomerID: account ? account.CustomerID : ""
        };
        const customer = await Customer.findOne(customerDetailsParams);

        // finding the Mutual Fund Plan in which the amount has to be deposited
        const mutualFundSearchParams = {
            MutualFundId: req.body.MutualFundId,
            CustomerID: account ? account.CustomerID : ""
        };
        const mutualFund = await MutualFund.findOne(mutualFundSearchParams);

        // amount to be added to investment
        const paymentAmount = req.body.paymentAmount;

        // individual checks over various parameters
        const paymentAmountCheck = paymentAmount > 0 && account ? account.Balance >= paymentAmount : false;
        const accountCheck = account ? true : false;
        const nameCheck = req.body.CustomerName.toLowerCase() === (customer ? customer.Name : "").toLowerCase() ? true : false;
        const mutualFundCheck = mutualFund ? true : false;

        // combining all different checks together
        const proceedPayment = paymentAmountCheck && accountCheck && nameCheck && mutualFundCheck;

        // making changes in database to finalise payment
        if (proceedPayment) {
            Account.updateOne(accountSearchParams, {Balance: account.Balance - paymentAmount})
            .then((resultAccount) => {
                MutualFund.updateOne(mutualFundSearchParams, {Amount: mutualFund.Amount + paymentAmount})
                .then((resultMutualFund) => {
                    res.send("Deposit to mutual fund successful");
                })
                .catch((err) => {
                    // can revert changes on account
                    res.send("Revert Changes !!!");
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else {
            res.send("Condtion Not Passed");
        }
    } catch (err) {
        console.log(err);
    }
};

const initialise_insurance = async (req, res) => {
    try {
        // parameters for searching the account
        const accountSearchParams = {
            AccountNumber: req.body.AccountNumber,
            IFSCCode: req.body.IFSCCode
        };
        // searching for account and waiting till we get it
        const account = await Account.findOne(accountSearchParams);

        // fetching customer details for name matching
        const customerDetailsParams = {
            CustomerID: account ? account.CustomerID : ""
        };
        const customer = await Customer.findOne(customerDetailsParams);

        // finding insurance in which deposit has to be made
        const insuranceSearchParams = {
            InsuranceId: req.body.InsuranceId,
            CustomerID: account ? account.CustomerID : ""
        };
        const insurance = await Insurance.findOne(insuranceSearchParams);

        // amount to be added to investment
        const paymentAmount = insurance ? insurance.MonthlyInstallment : 0;

        // individual checks over various parameters
        const paymentAmountCheck = paymentAmount > 0 && account ? account.Balance >= paymentAmount : false;
        const accountCheck = account ? true : false;
        const nameCheck = req.body.CustomerName.toLowerCase() === (customer ? customer.Name : "").toLowerCase() ? true : false;
        const insuranceCheck = insurance ? true : false;

        // combining all different checks together
        const proceedPayment = paymentAmountCheck && accountCheck && nameCheck && insuranceCheck;

        // making changes in database to finalise payment
        if (proceedPayment) {
            Account.updateOne(accountSearchParams, {Balance: account.Balance - paymentAmount})
            .then((resultAccount) => {
                Insurance.updateOne(insuranceSearchParams, {Amount: insurance.Amount + paymentAmount})
                .then((resultInsurance) => {
                    res.send("Deposit to insurance Successful");
                })
                .catch((err) => {
                    res.send("Revert Changes!!!");
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else {
            res.send("Condition Not Passed");
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    initialise_transaction,
    initialise_investment,
    initialise_mutual_fund,
    initialise_insurance,
};