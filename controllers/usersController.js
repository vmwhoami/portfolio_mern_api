const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model("User")

// Get all users
exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,
    data: {
      users: allUsers,
    },
  });
};

// Create USer
exports.createUser = (req, res) => {
  const { email, password } = req.body
  console.log(email, password);
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.json({ message: "This email has been taken" })
    }
    bcrypt.hash(password, 12).then(hashedPass => {
      const newUser = new User({ email, password: hashedPass })
      newUser.save().then(user => {
        res.status(200).json({
          status: 'success',
          message: 'User created',
          data: {
            user: user,
          },
        })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))

  })
};

exports.getUser = async (req, res) => {
  const { email } = req.body
  console.log(email);
  const foundUser = await User.findOne({ email })
  console.log(foundUser);
  // res.status(200).json({
  //   status: 'success',
  //   timeOfUnswer: res.timpulCerrerii,

  // });
};
exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,


  });
};
exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,
  });
};