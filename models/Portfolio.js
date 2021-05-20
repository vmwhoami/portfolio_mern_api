const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const PortfolioSchema = new Schema({
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
  slug: {
    type: String,
    unique: true,
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
  },
},
{
  timestamps: true,
});

PortfolioSchema.pre('save', async function (next) {
  const slugify = (str) => str.trim().toLowerCase().split(' ').join('-');
  this.slug = slugify(this.title);
  return next();
});


mongoose.model('Portfolio', PortfolioSchema);