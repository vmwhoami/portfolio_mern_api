const Portfolio = require('../models/Portfolio');
const MongoClient = require('mongodb').MongoClient;
const connectionStr = require('../config/keys').mongoURL;
const client = new MongoClient(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });


exports.createPortfolioItem = async (req, res) => {
  try {
    let newPortfolioItem = new Portfolio(req.body)
    await client.connect();
    await client.db("Portfolio").collection("items").insertOne(newPortfolioItem);
    res.status(201).json({
      status: 'success',
      message: 'Portfolio Item Created',
      data: {
        portfolio: newPortfolioItem,
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }

};

exports.getAllPortfolioItems = async (req, res) => {

  try {
    await client.connect();
    const allPortfolioItems = await client.db("Portfolio").collection("items").find().toArray()
    console.log(allPortfolioItems);
    res.status(200).json({
      status: 'success',
      message: 'Portfolio Items',
      data: {
        portfolio: allPortfolioItems,
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};



exports.getPortfolioItem = (req, res) => {
  let { id } = req.params;
  id *= 1;
  const queryResult = data.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    portfolioItem: queryResult,
  });
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