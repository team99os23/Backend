const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customer_routes = require('./routes/customerRoutes');
const account_routes = require('./routes/accountRoutes')
const account = require('./models/account');

const app = express();

mongoose.connect('mongodb://localhost:27017/BankData', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(bodyParser.json());

app.use('/customers', customer_routes);
app.use('/accounts', account_routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
