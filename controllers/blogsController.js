const mongoose = require('mongoose');
require('../models/Post');
const catchErrorAsync = require('../utils/catchAsyncErrors');

const Post = mongoose.model('Post');
const AppError = require('../utils/appError');

exports.createBlogPost = catchErrorAsync(async (req, res, next) => {
  const {
    title,
    image,
    content,
  } = req.body;
  if (!req.user) {
    return next(new AppError('You have to login to write a blogpost'));
  }

  if (!title || !image || !content) {
    return next(new AppError('There is some info missing'));
  }

  req.user.password = undefined;
  const newPostItem = new Post({
    title,
    image,
    content,
    createdBy: req.user,
  });
  newPostItem.save((err) => {
    if (err) return res.json({ err });
    return null;
  });

  return res.status(201).json({
    status: 'success',
    message: 'Post Item Created',
    data: {
      Post: newPostItem,
    },
  });
});
// eslint-disable-next-line no-unused-vars
exports.getAllBlogPosts = catchErrorAsync(async (req, res, next) => {
  const allPostItems = await Post.find();
  const numOfItems = allPostItems.length;
  res.status(200).json({
    status: 'success',
    message: 'Post Items',
    numberOfItems: numOfItems,
    data: {
      Posts: allPostItems,
    },
  });
});

// eslint-disable-next-line no-unused-vars
exports.getBlogPost = catchErrorAsync(async (req, res, next) => {
  const { id } = req.body;
  const post = await Post.findById({ _id: id });
  res.status(200).json({
    status: 'success',
    data: post,
  });
});

exports.updateBlogPost = catchErrorAsync(async (req, res, next) => {
  if (!req.user.admin) {
    return next(new AppError('You have to be the site admin to update a Post item'));
  }
  const { id } = req.body;
  const PostItem = await Post.findById(id);
  const { createdBy } = PostItem;
  const { _id: userId } = req.user;
  if (JSON.stringify(createdBy) !== JSON.stringify(userId)) {
    return res.status(402).json({
      message: 'You have to be logged in as the creator of the post',
    });
  }
  const updatedPostItem = await Post.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
    new: true,
    runValidators: true,
  });
  return res.json({
    message: 'Updates',
    data: updatedPostItem,
  });
});

exports.deleteBlogPost = catchErrorAsync(async (req, res, next) => {
  if (!req.user.admin) {
    return next(new AppError('You have to be the site admin to update a Post item'));
  }
  const { id } = req.body;
  await Post.findByIdAndDelete(id, { useFindAndModify: false });
  return res.status(204).json({
    message: 'The Post Item was deleted',
  });
});