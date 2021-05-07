const mongoose = require('mongoose');
require('../models/Portfolio');
const catchErrorAsync = require('../utils/catchAsyncErrors');
const AppError = require('../utils/appError');

const Portfolio = mongoose.model('Portfolio');

exports.createPortfolioItem = catchErrorAsync(async (req, res, next) => {
  const {
    title, technologies, image,
    githubLink, liveLink, description,
  } = req.body;

  if (!req.user.admin) {
    return next(new AppError('You have to be the site admin to add a portfolio item', 401));
  }

  if (!title || !image || !githubLink || !liveLink || !description) {
    return next(new AppError('There is some info missing', 406));
  }
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
    return null;
  });

  return res.status(201).json({
    status: 'success',
    message: 'Portfolio Item Created',
    data: {
      portfolio: newPortfolioItem,
    },
  });
});

exports.getAllPortfolioItems = catchErrorAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = Portfolio.find(JSON.parse(queryStr));
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }
  const allPortfolioItems = await query;
  const numOfItems = allPortfolioItems.length;
  res.status(200).json({
    status: 'success',
    message: 'Portfolio Items',
    numberOfItems: numOfItems,
    data: {
      portfolios: allPortfolioItems,
    },
  });
});


exports.getPortfolioItem = catchErrorAsync(async (req, res, next) => {
  const { id } = req.body;
  const portfolio = await Portfolio.findById({ _id: id });
  res.status(200).json({
    status: 'success',
    data: portfolio,
  });
  return null;
});


exports.updatePortfolioItem = catchErrorAsync(async (req, res, next) => {
  if (!req.user.admin) {
    return next(new AppError('You have to be the site admin to add a portfolio item', 401));
  }
  const { id } = req.body;
  const portfolioItem = await Portfolio.findById(id);
  const { createdBy } = portfolioItem;
  const { _id: userId } = req.user;
  if (JSON.stringify(createdBy) !== JSON.stringify(userId)) {
    return res.status(402).json({
      message: 'You have to be logged in as the creator of the post',
    });
  }
  const updatedPorfolioItem = await Portfolio.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
    new: true,
    runValidators: true,
  });
  return res.json({
    message: 'Updates',
    data: updatedPorfolioItem,
  });
});

exports.deletePortfolioItem = catchErrorAsync(async (req, res, next) => {
  if (!req.user.admin) {
    return next(new AppError('You have to be the site admin to delete a portfolio item', 401));
  }
  const { id } = req.body;
  const portfolioItem = await Portfolio.findById(id);
  const { createdBy } = portfolioItem;
  const { _id: userId } = req.user;
  if (JSON.stringify(createdBy) !== JSON.stringify(userId)) {
    return next(new AppError('You have to be logged in as the creator of this post to delete it', 402));
  }
  await Portfolio.findByIdAndDelete(id, { useFindAndModify: false });
  return res.status(204).json({
    message: 'The portfolio Item was deleted',
  });
});