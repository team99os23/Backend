const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InsuranceSchema = new Schema(
  {
    InsuranceID: {
      type: String,
      required: true,
    },
    CustomerID: {
      type: String,
      required: true,
    },
    InsuranceType: {
      type: String,
      required: true,
    },
    InsuranceName: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    MonthlyInstallment: {
      type: Number,
      required: true,
    },
    MaturityDate: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true
    },
    Amount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

InsuranceSchema.pre("save", function (next) {
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

  const InsuranceID = `INS_Id_${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${randomDigits}`;

  this.InsuranceID = InsuranceID;

  next();
});
const Insurance = mongoose.model("Insurance", InsuranceSchema);

module.exports = Insurance;
