const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/appError');
require('../models/User');

const User = mongoose.model('User');


// eslint-disable-next-line no-unused-vars
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const allUsers = await User.find();
  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,
    data: {
      users: allUsers,
    },
  });
});

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  const { email, password } = req.body;
  const newUSer = await User.findOne({ email });
  if (newUSer) {
    next(new AppError('This email has been taken', 401));
  }
  const newUser = new User({ email, password });
  const user = await newUser.save();
  // eslint-disable-next-line
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: '10d' });
  return res.status(200).json({
    status: 'success',
    message: 'User created',
    token,
    data: {
      user,
    },
  });
});

// eslint-disable-next-line no-unused-vars
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ email });

  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,
    data: foundUser,
  });
});

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