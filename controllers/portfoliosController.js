const mongoose = require('mongoose');
require('../models/Portfolio');

const Portfolio = mongoose.model('Portfolio');

exports.createPortfolioItem = async (req, res) => {
  const { title, technologies, image } = req.body;
  if (!title || !image) {
    return res.json({ message: 'No title or Image provided' });
  }
  try {
    req.user.password = undefined
    const newPortfolioItem = new Portfolio({
      title,
      technologies,
      image,
      createdBy: req.user
    });
    newPortfolioItem.save((err) => {
      if (err) return res.send(err);
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
      message: "fail",
      error
    })
  }
};

exports.getAllPortfolioItems = async (req, res) => {
  try {
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
      message: "fail",
      error
    })
  }
};


exports.getPortfolioItem = async (req, res) => {
  const { id } = req.body
  try {
    const portfolio = await Portfolio.findById({ _id: id })
    res.status(200).json({
      status: 'success',
      data: portfolio
    })
  } catch (error) {
    res.status(404).json({
      message: "fail",
      error
    })
  }
  return null
};


exports.updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.body
    const updatedPorfolioItem = await Portfolio.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    res.json({
      message: "Updates",
      data: updatedPorfolioItem
    })
  } catch (error) {
    res.status(404).json({
      message: "fail",
      error
    })
  }
};

exports.deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.body
    await Portfolio.findByIdAndDelete(id)
    res.status(204).json({
      message: "The portfolio Item was deleted",
    })
  } catch (error) {
    res.status(404).json({
      message: "fail",
      error
    })
  }

};