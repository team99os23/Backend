const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  CustomerID: {
    type: String,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  DateofBirth: {
    type: Date,
    required: true
  },
  Gender: {
    type: String
  },
  Address: {
    type: String,
    required: true
  },
  AadhaarNumber: {
    type: Number,
    required: true,
    unique: true
  },
  ContactNumber: {
    type: Number,
    required: true,
    unique: true
  },
  EmailID: {
    type: String,
    required: true,
    unique: true
  }
});
customerSchema.pre('save', function (next) {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0');
    
    const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    const CustomerID = `C_Id_${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${randomDigits}`;
    
    this.CustomerID = CustomerID;
    
    next();
  });

module.exports = mongoose.model('Customer', customerSchema);
