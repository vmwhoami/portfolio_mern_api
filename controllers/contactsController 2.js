const mongoose = require('mongoose');
require('../models/Contact');

const Contact = mongoose.model('Contact');


exports.createContact = async (req, res) => {
  const {
    name,
    email,
    subject,
    message,
  } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'There is some info missing' });
  }
  try {
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
  } catch (error) {
    res.status(404).json({
      message: 'fail',
      error,
    });
  }
  return null;
};