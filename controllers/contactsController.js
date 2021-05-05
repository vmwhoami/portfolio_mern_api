const mongoose = require('mongoose');
require('../models/Contact');
const sendMail = require('../utils/email');

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
    sendMail({
      to: 'vmwhoami@gmail.com',
      from: 'thenewyoungcoder@gmail.com',
      subject: 'New message from vitaliemelnic.tech',
      html: `<h1>You have got an email from ${name}</h1>
      <h2>His email is: ${email}</h2>
      <h2>${subject}</h2>
      <h2>With the message being:</h2>
      <p>${message}</p>
      `,
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