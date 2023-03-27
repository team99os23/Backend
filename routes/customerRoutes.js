const express = require('express');
const customerController = require("../controllers/customerController")

const router = express.Router();

router.get('/', customerController.customer_index);
router.post('/', customerController.customer_create);
router.post('/:id', customerController.customer_update)
router.get('/:id', customerController.customer_details);
// router.get

module.exports = router;