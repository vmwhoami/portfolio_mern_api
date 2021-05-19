const mongoose = require('mongoose');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/appError');
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
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const newUSer = await User.findOne({ email });
  if (newUSer) {
    next(new AppError('This email has been taken', 401));
  }
  const newUser = new User({ email, password });
  const user = await newUser.save();
  return res.status(200).json({
    status: 'success',
    message: 'User created',
    data: {
      user,
    },
  });
});

exports.getUser = async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ email });

  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,
    data: foundUser,
  });
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