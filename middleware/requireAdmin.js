const mongoose = require('mongoose');
const catchErrorAsync = require('../utils/catchAsyncErrors');
const AppError = require('../utils/appError');
const User = mongoose.model('User');

module.exports = catchErrorAsync(async (req, res, next) => {
  const { admin } = req.user
  if (!admin) {
    return next(new AppError('You have to be the site admin to perform this action', 401));
  }
  return next()
});