const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const PortfolioSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  technologies: {
    type: Array,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
  },
},
{
  timestamps: true,
});

mongoose.model('Portfolio', PortfolioSchema);