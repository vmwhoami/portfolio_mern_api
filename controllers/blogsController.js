const mongoose = require('mongoose');
require('../models/Post');

const Post = mongoose.model('Post');

exports.createBlogPost = async (req, res) => {
  const {
    title,
    image,
    content,
  } = req.body;

  if (!req.user) {
    return res.json({ message: 'You have to be the site admin to add a Post item' });
  }

  if (!title || !image || !content) {
    return res.json({ message: 'There is some info missing' });
  }
  try {
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
  } catch (error) {
    res.status(404).json({
      message: 'fail',
      error,
    });
  }
  return null;
};

exports.getAllBlogPosts = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      message: 'fail',
      error,
    });
  }
};


exports.getBlogPost = async (req, res) => {
  const { id } = req.body;
  try {
    const post = await Post.findById({ _id: id });
    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    res.status(404).json({
      message: 'fail',
      error,
    });
  }
  return null;
};


exports.updateBlogPost = async (req, res) => {
  try {
    if (!req.user.admin) {
      return res.json({ message: 'You have to be the site admin to update a Post item' });
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
  } catch (error) {
    res.status(404).json({
      message: 'fail',
      error,
    });
  }
  return null;
};

exports.deleteBlogPost = async (req, res) => {
  try {
    if (!req.user.admin) {
      return res.json({ message: 'You have to be the site admin to update a Post item' });
    }
    const { id } = req.body;


    await Post.findByIdAndDelete(id, { useFindAndModify: false });
    return res.status(204).json({
      message: 'The Post Item was deleted',
    });
  } catch (error) {
    res.status(404).json({
      message: 'fail',
      error,
    });
  }
  return null;
};