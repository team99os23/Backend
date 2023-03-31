const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Payment_Transactions_Schema = new Schema({
  sender: {
    AccountNumber: {
      type: String,
      required: true,
    },
    IFSCCode: {
      type: String,
      required: true,
    },
    CustomerName: {
      type: String,
      required: true,
    },
  },
  receiver: {
    AccountNumber: {
      type: String,
      required: true,
    },
    IFSCCode: {
      type: String,
      required: true,
    },
    CustomerName: {
      type: String,
      required: true,
    },
  },
  paymentAmount: {
    type: Number,
    required: true
  }
});

const Payment_Investments_Schema = new Schema({
  AccountNumber: {
    type: String,
    required: true,
  },
  IFSCCode: {
    type: String,
    required: true,
  },
  CustomerName: {
    type: String,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  InvestmentID: {
    type: String,
    required: true,
  },
});

const Payment_MutualFunds_Schema = new Schema({
  AccountNumber: {
    type: String,
    required: true,
  },
  IFSCCode: {
    type: String,
    required: true,
  },
  CustomerName: {
    type: String,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  MutualFundsID: {
    type: String,
    required: true,
  },
});

const Payment_Insurance_Schema = new Schema({
  AccountNumber: {
    type: String,
    required: true,
  },
  IFSCCode: {
    type: String,
    required: true,
  },
  CustomerName: {
    type: String,
    required: true,
  },
  InsuranceID: {
    type: String,
    required: true,
  },
});

const Payment_Insurance = mongoose.model(
  "Payment_Insurance",
  Payment_Investments_Schema
);

const Payment_Investments = mongoose.model(
  "Payment_Investments",
  Payment_Investments_Schema
);

const Payment_MutualFunds = mongoose.model(
  "Payment_MutualFUnds",
  Payment_MutualFunds_Schema
);

const Payment_Transactions = mongoose.model(
  "Payment_Transactions",
  Payment_Transactions_Schema
);

module.exports = {
  Payment_Insurance,
  Payment_Investments,
  Payment_MutualFunds,
  Payment_Transactions,
};
