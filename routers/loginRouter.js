const express = require('express');

const router = express.Router();

const { Login } = require('../controllers/authController');

router.route('/').post(Login);


module.exports = router;