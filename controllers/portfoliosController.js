const mongoose = require('mongoose');
require('../models/Portfolio');

const Portfolio = mongoose.model('Portfolio');

exports.createPortfolioItem = async (req, res) => {
  const { title, technologies, image } = req.body;
  if (!title || !image) {
    return res.json({ message: 'No title or Image provided' });
  }
  try {
    const newPortfolioItem = new Portfolio(req.body);
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
    console.error(error);
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
    console.error(error);
  }
};


exports.getPortfolioItem = async (req, res) => {
  const { ObjectId } = require('mongodb');
  const { id } = req.body;
  try {
    res.status(200).json({
      status: 'sucica',
      message: 'Portfolio',
      data: {
        portfolio: porfolioItem,
      },
    });
  } catch (error) {
    console.error(error);
  }
};


exports.updatePortfolioItem = (req, res) => {
  let { id } = req.params;
  id *= 1;
  const queryResult = data.find((el) => el.id === id);

  res.status(404).json({
    status: 'success',
    portfolioItem: queryResult,
  });
};

exports.deletePortfolioItem = (req, res) => {
  let { id } = req.params;
  id *= 1;
  const queryResult = data.find((el) => el.id === id);
  res.status(404).json({
    status: 'success',
    portfolioItem: null,
  });
};