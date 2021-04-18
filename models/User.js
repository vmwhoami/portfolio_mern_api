const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'An email must be present'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'You have to provide a password'],
  },
  admin: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

mongoose.model('User', UserSchema);