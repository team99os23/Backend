const Customer = require("../models/customer")


const customer_details = async (req, res) => {
    let customer;
    try {
      customer = await Customer.findOne({ CustomerID: req.body.CustomerID });
      console.log(customer);
      if (customer == null) {
        res.status(404).json({ message: 'Cannot find customer' });
      }
      res.json(customer);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

const customer_index = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

const customer_create = async (req, res) => {
  try {
    const {
      Name,
      DateofBirth,
      Gender,
      Address,
      AadhaarNumber,
      ContactNumber,
      EmailID,
    } = req.body;

    if (!Name || !EmailID || !AadhaarNumber) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const customer = new Customer({
      Name,
      DateofBirth,
      Gender,
      Address,
      AadhaarNumber,
      ContactNumber,
      EmailID,
    });

    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const customer_update = async (req, res) => {

  try {
    const CustomerID = req.body.CustomerID;
    const Name = req.body.Name;
    const DateofBirth = req.body.DateofBirth;
    const Gender = req.body.Gender;
    const AadhaarNumber = req.body.AadhaarNumber;
    const ContactNumber = req.body.ContactNumber;
    const EmailID = req.body.EmailID;
    const filter = { CustomerID: CustomerID };
    const update = { Name: Name, DateofBirth: DateofBirth, Gender: Gender, AadhaarNumber: AadhaarNumber, ContactNumber: ContactNumber, EmailID: EmailID };
    const options = { new: true };
    const updatedCustomer = await Customer.findOneAndUpdate(filter, update, options);
    if (updatedCustomer) {
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ message: `No customer found with CustomerID ${CustomerID}` });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    customer_index,
    customer_details,
    customer_create,
    customer_update
}