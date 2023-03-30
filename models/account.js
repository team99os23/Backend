const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
        AccountNumber:{
            type: String,
            required: true
        },
        IFSCCode: {
            type: String,
            required: true
        },
        CustomerID: {
            type: String,
            required: true
        },
        AccountType:{
            type: String,
            required: true
        },
        CVV : {
            type : Number,
            required: true
        },
        ExpiryDate : {
            type : String,
            required : true
        },
        Balance:{
            type: Number,
            required: true
        }
    },
    {timestamps : true}
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;