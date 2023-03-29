const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MutualFundsSchema = new Schema({
  MutualFundsID: {
    type: String,
    required: true,
  },
  CustomerID: {
    type: String,
    required: true,
  },
  MutualFundsName: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  PoolDescription: {
    type: String,
    required : true
  }
});

MutualFundsSchema.pre("save", function (next) {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const milliseconds = currentDate
    .getMilliseconds()
    .toString()
    .padStart(3, "0");

  const randomDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  const MutualFundsID = `M_Id_${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${randomDigits}`;

  this.MutualFundsID = MutualFundsID;

  next();
});
let MutualFunds;

if(mongoose.models.MutualFunds)
MutualFunds = mongoose.model("MutualFunds");
else
MutualFunds = mongoose.model("MutualFunds", MutualFundsSchema); 

module.exports = MutualFunds;
