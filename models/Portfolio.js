const mongoose = require('mongoose');

const { Schema } = mongoose;

const PortfolioSchema = new Schema({
  handle: {
    type: String,
    require: true,
  },
  title: {
    type: String,
  },
  technologies: {
    type: Array,
  },
  image: {
    type: String
  }
},
  {
    timestamps: true,
  });

module.exports = Portfolio = mongoose.model('Portfolio', PortfolioSchema);