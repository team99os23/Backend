const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const accountController = require("../controllers/accountController");

const jsonParser = bodyParser.json();


router.post("/create", jsonParser, accountController.create_account);

router.post("/get-details", jsonParser, accountController.get_details);

router.post("/update-account-type", jsonParser, accountController.update_account_type);


module.exports = router;