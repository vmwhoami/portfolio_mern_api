const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  handle: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: [true, 'An email must be present'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'You have to provide a password'],
  },
},
  {
    timestamps: true,
  });

module.exports = User = mongoose.model('User', UserSchema);