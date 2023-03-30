const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const paymentController = require("../controllers/paymentController");

const jsonParser = bodyParser.json();

// To initialise payment between two people
router.post("/initialise-transaction", jsonParser, paymentController.initialise_transaction);

// To process an investment payment
router.post("/initialise-investment", jsonParser, paymentController.initialise_investment);

// To process a mutual Fund payment
router.post("/initialise-mutual-fund", jsonParser, paymentController.initialise_mutual_fund);

// To process an insurance payment
router.post("/initialise-insurance", jsonParser, paymentController.initialise_insurance);

module.exports = router;