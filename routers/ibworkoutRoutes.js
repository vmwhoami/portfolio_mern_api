const express = require('express');
const router = express.Router();

const { ibwContact } = require('../controllers/ibwContactController');

router.route('/').post(ibwContact);

module.exports = router;