const express = require("express");
const insuranceController = require("../controllers/insuranceController");

const router = express.Router();

router.get("/", insuranceController.account_index);
router.post("/", insuranceController.create_insurance);
router.post("/update", insuranceController.update_insurance_type);
router.post("/details", insuranceController.get_details);
// router.delete("/:id", insuranceController.delete_insurance);

module.exports = router;
