const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const Post = new Schema({
  title: {
    type: String,
    required: true,
  },
  technologies: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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