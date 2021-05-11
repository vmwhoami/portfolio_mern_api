const mongoose = require('mongoose');
require('../models/Contact');

const catchErrorAsync = require('../utils/catchAsyncErrors');
const AppError = require('../utils/appError')
const Contact = mongoose.model('Contact');

exports.createContact = catchErrorAsync(async (req, res) => {
  const {
    name,
    email,
    subject,
    message,
  } = req.body;

  if (!name || !email || !message) {
    return new AppError('There is some info missing', 400)
  }

  const newContact = new Contact({
    name,
    email,
    subject,
    message,
  });
  newContact.save((err) => {
    if (err) return res.json({ err });
    return null;
  });

  return res.status(201).json({
    status: 'success',
    message: 'Contact Saved',
    data: {
      Contact: newContact,
    },
  });

});