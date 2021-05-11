const mongoose = require('mongoose');
const validator = require('validator')
const sendMail = require('../utils/email');

const { Schema } = mongoose;


const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  });

ContactSchema.post('save', (doc, next) => {
  sendMail(doc);
  next();
});
mongoose.model('Contact', ContactSchema);