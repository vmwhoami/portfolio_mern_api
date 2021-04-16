const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('../models/User');

const User = mongoose.model('User');

// Get all users
exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,
    data: {
      users: allUsers,
    },
  });
};

// Create USer
exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUSer = await User.findOne({ email });
    if (newUSer) {
      return res.json({ message: 'This email has been taken' });
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPass });
    const user = await newUser.save();
    return res.status(200).json({
      status: 'success',
      message: 'User created',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: 'fail',
      error,
    });
  }
  return null;
};

exports.getUser = async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ email });

  // res.status(200).json({
  //   status: 'success',
  //   timeOfUnswer: res.timpulCerrerii,

  // });
};
exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,
  });
};
exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,
  });
};