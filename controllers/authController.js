const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../models/User');
const catchErrorAsync = require('../utils/catchAsyncErrors');
const AppError = require('../utils/appError');

const User = mongoose.model('User');

const secret = process.env.JWT_SECRET;

exports.Login = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email and password must be present', 422));
  }
  const user = await User.findOne({ email }).select('+password');
  if (user) {
    const passMatch = await user.correctPassword(password, user.password);
    if (passMatch) {
      const token = jwt.sign({ id: user.id }, secret);
      return res.json({
        success: 'Successfully loged in', token, email: user.email, admin: user.admin,
      });
    }
    return next(new AppError('Email or password is invalid', 422));
  }
  return next(new AppError('Wrong credentials', 404));
});