const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../models/User');
const catchErrorAsync = require('../utils/catchAsyncErrors');
const AppError = require('../utils/appError');

const User = mongoose.model('User');

const secret = process.env.JWT_SECRET;
const expires = process.env.EXPIRES_IN;
const cookieExpiration = process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000;
const signToken = (id) => jwt.sign({ id }, secret, {
  expiresIn: expires,
});

const createSendToke = (user, statusCode, res) => {
  // eslint-disable-next-line
  const token = signToken(user._id);

  res.cookie('vmwhoami', token, {
    expires: new Date(Date.now() + cookieExpiration),
    // secure: true,
    httpOnly: true,
  });
  return res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      email: user.email,
      admin: user.admin,
    },
  });
};

exports.Login = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email and password must be present', 422));
  }
  const user = await User.findOne({ email }).select('+password');
  if (user) {
    const passMatch = await user.correctPassword(password, user.password);
    if (passMatch) {
      return createSendToke(user, 201, res);
    }
    return next(new AppError('Email or password is invalid', 422));
  }
  return next(new AppError('Wrong credentials', 404));
});