const express = require('express');
const accountController = require("../controllers/accountController")

const router = express.Router();

router.get('/', accountController.account_index);
router.post('/', accountController.account_create);
router.post('/:id', accountController.account_update);
router.get('/:id', accountController.account_details);
router.delete('/:id', accountController.account_delete);

module.exports = router;