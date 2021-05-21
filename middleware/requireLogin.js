const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const catchErrorAsync = require('../utils/catchAsyncErrors');

const secret = process.env.JWT_SECRET;
const AppError = require('../utils/appError');

const User = mongoose.model('User');

module.exports = catchErrorAsync(async (req, res, next) => {
  const { authorization } = req.headers;


  if (!authorization) {
    return next(new AppError('You have to login to perform this action', 401));
  }
  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return next(new AppError('You are not logged in please login to get access', 401));
  }

  const decoded = await promisify(jwt.verify)(token, secret);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('The user belonging to this does not exists', 401));
  }
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password', 401));
  }

  req.user = freshUser;
  return next();
});