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
  passwordChangedAt: Date,
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

UserSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTime;
  }
  return false;
};
mongoose.model('User', UserSchema);