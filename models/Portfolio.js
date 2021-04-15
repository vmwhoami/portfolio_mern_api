const mongoose = require('mongoose');

const { Schema } = mongoose;

const PortfolioSchema = new Schema({
  handle: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  technologies: {
    type: Array,
  },
  image: {
    type: String,
  },
},
{
  timestamps: true,
});

exports.model = Portfolio = mongoose.model('Portfolio', PortfolioSchema);