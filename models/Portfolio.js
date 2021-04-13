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
    type: Text
  }
},
  {
    timestamps: true,
  });

module.exports = Portfolio = mongoose.model('User', PortfolioSchema);