const express = require("express");
const investmentController = require("../controllers/investmentController");

const router = express.Router();

router.get("/", investmentController.account_index);
router.post("/", investmentController.create_investment);
router.post("/update", investmentController.update_investment_type);
router.get("/:id", investmentController.get_details);
// router.delete("/:id", investmentController.delete_investment);

module.exports = router;
