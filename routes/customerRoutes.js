const express = require('express');
const customerController = require("../controllers/customerController")

const router = express.Router();

router.get('/', customerController.customer_index);
router.post('/', customerController.customer_create);
router.post('/update', customerController.customer_update)
router.get('/details', customerController.customer_details);
// router.get

module.exports = router;