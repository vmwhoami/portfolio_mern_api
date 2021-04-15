const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model("User")

exports.Login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).json({
      message: "Email and password must be present"
    })
  }
  const user = await User.findOne({ email })
  if (user) {
    const passMatch = await bcrypt.compare(password, user.password)
    if (passMatch) {
      res.json({ message: "Success right password" })
    } else {
      return res.status(422).json({
        message: "Email or password is invalid"
      })
    }
  } else {
    return res.status(404).json({
      message: "The user with this email does not exist"
    })
  }
}