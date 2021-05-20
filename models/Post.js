const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
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

PostSchema.pre('save', async function (next) {
  const slugify = (str) => str.trim().toLowerCase().split(' ').join('-');
  this.slug = slugify(this.title);
  return next();
});

mongoose.model('Post', PostSchema);