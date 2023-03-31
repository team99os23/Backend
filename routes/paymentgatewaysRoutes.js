const express = require("express");
const paymentgatewaysController = require("../controllers/paymentgatewaysController");

const router = express.Router();

router.post(
  "/payment/initialise-insurance",
  paymentgatewaysController.initialise_insurance
);

router.post(
  "/payment/initialise-transaction",
  paymentgatewaysController.initialise_transaction
);

router.post(
  "/payment/initialise-investment",
  paymentgatewaysController.initialise_investment
);

router.post(
  "/payment/initialise-mutual-fund",
  paymentgatewaysController.initialise_mutualfunds
);

module.exports = router;
