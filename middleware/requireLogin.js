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
  await jwt.verify(token, secret, async (error, payload) => {
    if (error) {
      return next(new AppError('You have to login to perform this action', 401));
    }
    const { id } = payload;
    const user = await User.findById({ _id: id });
    req.user = user;
    return next();
  });
  return null;
});