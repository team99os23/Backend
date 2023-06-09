require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const customer_routes = require('./routes/customerRoutes');
const account_routes = require('./routes/accountRoutes');
const payment_routes = require("./routes/paymentRoutes");
const insurance_routes = require("./routes/insuranceRoutes");
const mutualfunds_routes = require("./routes/mutualfundsRoutes");
const investment_routes = require("./routes/investmentRoutes");


const app = express();

const dbURI = process.env.MONGODB_URI;

// connecting to mongoDB Atlas server
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
    app.listen(3001, "0.0.0.0");
    console.log("Server Running On Port 3001");
})
.catch((err)=>{
    console.log(err);
})

app.use(bodyParser.json());
app.use(cors());

app.use("/customers", customer_routes);
app.use("/accounts", account_routes);
app.use("/payment", payment_routes);
app.use("/insurance", insurance_routes);
app.use("/mutual_funds", mutualfunds_routes);
app.use("/investment", investment_routes);

app.get("/", (req, res) => {
  res.send(
    "Please write the desired url to visit different routes. Have a Nice Day"
  );
});
