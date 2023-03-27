const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  AccountNumber: {
    type: Number,
    required: true
  },
  IFSCCode: {
    type: String,
    required: true
  },
  CustomerID: {
    type: String,
    required: true,
    unique: true
  },
  AccountType: {
    type:String,
    required: true
  },
  Balance: {
    type:Number,
    required: true
  }
});

module.exports = mongoose.model('Account', accountSchema);
