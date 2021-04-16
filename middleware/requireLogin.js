const jwt = require('jsonwebtoken');
const secret = require('../config/keys').JWT_SECRET;
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = async (req, res, next) => {

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: 'You have to login to perform this action',
    });
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, secret, async (error, payload) => {
    if (error) {
      return res.status(401).json({ error: 'You have to loggin to perform this acction' });
    }
    const { id } = payload;
    const user = await User.findById({ _id: id })
    req.user = user
    next();
  });


};