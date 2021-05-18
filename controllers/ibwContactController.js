const mongoose = require('mongoose');
require('../models/Ibworkout');
const catchErrorAsync = require('../utils/catchAsyncErrors');
const AppError = require('../utils/appError');

const Ibworkout = mongoose.model('Ibworkout');

exports.ibwContact = catchErrorAsync(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    message,
    select,
  } = req.body;

  if (!name || !email || !phone) {
    return next(new AppError('There is some info missing', 400));
  }

  const newContact = new Ibworkout({
    name,
    email,
    phone,
    message,
    select,
  });
  const contact = await newContact.save();
  if (!contact) {
    return next(new AppError('Sotething went over the board', 400));
  }
  return res.status(201).json({
    status: 'success',
    message: 'Contact Saved',
    data: {
      Contact: newContact,
    },
  });
});