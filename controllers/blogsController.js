const mongoose = require('mongoose');
require('../models/Post');
const Portfolio = mongoose.model('Post');

exports.createBlogPost = async (req, res) => {
  const {
    title,
    technologies,
    image,
    githubLink,
    liveLink,
    description,
  } = req.body;

  if (!req.user.admin) {
    return res.json({ message: 'You have to be the site admin to add a portfolio item' });
  }

  if (!title || !image || !githubLink || !liveLink || !description) {
    return res.json({ message: 'There is some info missing' });
  }
  try {
    req.user.password = undefined;
    const newPortfolioItem = new Portfolio({
      title,
      technologies,
      image,
      githubLink,
      liveLink,
      description,
      createdBy: req.user,
    });
    newPortfolioItem.save((err) => {
      if (err) return res.json({ err });
    });

    res.status(201).json({
      status: 'success',
      message: 'Portfolio Item Created',
      data: {
        portfolio: newPortfolioItem,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: 'fail',
      error,
    });
  }
};

exports.getAllBlogPosts = async (req, res) => {
  try {
    const querryObj = { ...req.query };
    const allPortfolioItems = await Portfolio.find();
    const numOfItems = allPortfolioItems.length;
    res.status(200).json({
      status: 'success',
      message: 'Portfolio Items',
      numberOfItems: numOfItems,
      data: {
        portfolios: allPortfolioItems,
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
    const portfolio = await Portfolio.findById({ _id: id });
    res.status(200).json({
      status: 'success',
      data: portfolio,
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
      return res.json({ message: 'You have to be the site admin to update a portfolio item' });
    }
    const { id } = req.body;
    const portfolioItem = await Portfolio.findById(id);
    const { createdBy } = portfolioItem;
    if (JSON.stringify(createdBy) !== JSON.stringify(req.user._id)) {
      return res.status(402).json({
        message: 'You have to be logged in as the creator of the post',
      });
    }
    const updatedPorfolioItem = await Portfolio.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      new: true,
      runValidators: true,
    });
    res.json({
      message: 'Updates',
      data: updatedPorfolioItem,
    });
  } catch (error) {
    res.status(404).json({
      message: 'fail',
      error,
    });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    if (!req.user.admin) {
      return res.json({ message: 'You have to be the site admin to update a portfolio item' });
    }
    const { id } = req.body;
    const portfolioItem = await Portfolio.findById(id);
    const { createdBy } = portfolioItem;
    if (JSON.stringify(createdBy) !== JSON.stringify(req.user._id)) {
      return res.status(402).json({
        message: 'You have to be logged in as the creator of this post to delete it',
      });
    }
    await Portfolio.findByIdAndDelete(id, { useFindAndModify: false });
    res.status(204).json({
      message: 'The portfolio Item was deleted',
    });
  } catch (error) {
    res.status(404).json({
      message: 'fail',
      error,
    });
  }
};