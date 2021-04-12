const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route(' /:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;