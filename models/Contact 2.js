const mongoose = require('mongoose');

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

mongoose.model('Contact', ContactSchema);