const mongoose = require('mongoose');
const validator = require('validator');
const ibworkMailer = require('../utils/ibworkMailer');

const { Schema } = mongoose;
const IBworkoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: Number,
    required: true
  },
  message: {
    type: String,
  },
  select: {
    type: String,
  }
},
  {
    timestamps: true,
  });

IBworkoutSchema.post('save', (doc, next) => {
  ibworkMailer(doc);
  next();
});
mongoose.model('Ibworkout', IBworkoutSchema);