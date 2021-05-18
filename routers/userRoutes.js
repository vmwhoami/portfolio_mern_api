const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');
const requireLogin = require('../middleware/requireLogin');
const requireAdmin = require('../middleware/requireAdmin')
router.route('/')
  .get(requireLogin, requireAdmin, getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .patch(requireAdmin, updateUser)
  .delete(deleteUser);

module.exports = router;