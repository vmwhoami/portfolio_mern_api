const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  handle: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

module.exports = User = mongoose.model('User', UserSchema);