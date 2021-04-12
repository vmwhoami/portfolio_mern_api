const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,
    data: {
      users: 'here should all the users be',
    },
  });
};

exports.createUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          email: 'A user has already been regitered with this email',
        });
      } else {
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password,
        });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, err, (err, hash) => {
          if (err) throw (err);
          newUser.password = hash;
          newUser.save().then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    });
};

exports.getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,


  });
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