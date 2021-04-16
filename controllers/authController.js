// const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('User');
const jwt = require("jsonwebtoken");
const secret = require('../config/keys').JWT_SECRET


exports.Login = async (req, res) => {
  console.log(secret);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        message: 'Email and password must be present',
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (passMatch) {
        const token = jwt.sign({ _id: user._id }, secret)
        res.json({ token })

      } else {
        return res.status(422).json({
          message: 'Email or password is invalid',
        });
      }
    } else {
      return res.status(404).json({
        message: 'The user with this email does not exist',
      });
    }
  } catch (error) {
    return error;
  }
  return null;
};