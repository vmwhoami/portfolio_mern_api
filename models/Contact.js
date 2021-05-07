const mongoose = require('mongoose');
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