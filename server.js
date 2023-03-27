require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const customer_routes = require('./routes/customerRoutes');
const account_routes = require('./routes/accountRoutes');
const payment_routes = require("./routes/paymentRoutes");


const app = express();

mongoose.connect('mongodb://localhost:27017/BankData', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// connecting to mongoDB Atlas server
// mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
// .then((result)=>{
//     app.listen(4000);
//     console.log("Server Running On Port 4000");
// })
// .catch((err)=>{
//     console.log(err);
// })

app.use(bodyParser.json());
app.use(cors());

app.use("/customers", customer_routes);
app.use("/accounts", account_routes);
app.use("/payment", payment_routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
