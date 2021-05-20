const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);

  return next();
});
UserSchema.methods.correctPassword = async function (wantsToSignPass, userPass) {
  return bcrypt.compare(wantsToSignPass, userPass);
};


mongoose.model('User', UserSchema);