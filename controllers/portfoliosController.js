require('../models/Portfolio');
const mongoose = require('mongoose');

exports.createPortfolioItem = async (req, res) => {
  try {
    let newPortfolioItem = new Portfolio(req.body)
    console.log(newPortfolioItem);
    newPortfolioItem.save((err) => {
      console.log(err);
      if (err) return res.send('Error')

    })
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
    await client.connect();
    const allPortfolioItems = await client.db("Portfolio").collection("items").find().toArray()
    res.status(200).json({
      status: 'success',
      message: 'Portfolio Items',
      data: {
        portfolio: allPortfolioItems,
      },
    });
  } catch (error) {
    console.error(error);
  }
};


exports.getPortfolioItem = async (req, res) => {
  const ObjectId = require('mongodb').ObjectId;
  let { id } = req.body;
  try {
    await client.connect();
    const porfolioItem = await client.db("Portfolio").collection("items").find(ObjectId(id)).toArray()
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