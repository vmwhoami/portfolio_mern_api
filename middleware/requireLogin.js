const jwt = require("jsonwebtoken")
const secret = require('../config/keys').JWT_SECRET
const mongoose = require("mongoose")
const User = mongoose.model("User")

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({
      error: "You have to login to perform this action"
    })
  }

  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, secret, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "You have to loggin to perform this acction" })
    }
    const { _id } = payload
    User.findById({ _id }).then(userdata => {
      req.user = userdata
    })
  })
  next()
}