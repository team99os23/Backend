const express = require("express");
const mutualfundsController = require("../controllers/mutualfundsController");

const router = express.Router();

router.get("/", mutualfundsController.account_index);
router.post("/", mutualfundsController.create_mutualfunds);
router.post("/:id", mutualfundsController.update_mutualfunds);

module.exports = router;
