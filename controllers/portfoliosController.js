const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`${__dirname}/../data/portfolio.json`));

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > data.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
};

exports.checkRequiredData = (req, res, next, val) => {
  console.log(req.body);
  next();
}

exports.getAllPortfolioItems = (req, res) => {
  res.status(200).json({
    status: 'success',
    timeOfUnswer: res.timpulCerrerii,
    results: data.length,
    data: {
      portfolio: data,
    },
  });
};

exports.createPortfolioItem = (req, res) => {
  const Id = data[data.length - 1].id + 1;
  const newItem = { id: Id, ...req.body };
  data.push(newItem);
  fs.writeFile(`${__dirname}/data/portfolio.json`, JSON.stringify(data), () => {
    res.status(201).json({
      status: 'success',
      message: 'File written',
    });
  });
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