const fs = require('fs')
const experss = require('express')
const morgan = require('morgan')
const app = experss();
app.use(experss.json())

app.use(morgan('dev'))
app.use((req, res, next) => {
  res.timpulCerrerii = new Date().toISOString()
  next()
})

const port = 3000
const data = JSON.parse(fs.readFileSync(`${__dirname}/data/portfolio.json`))

const getAllPortfolioItems = (req, res) => {
  res.status(200).json({
    status: "success",
    timeOfUnswer: res.timpulCerrerii,
    results: data.length,
    data: {
      portfolio: data
    }
  })
}
const createPortfolioItem = (req, res) => {
  const Id = data[data.length - 1].id + 1;
  const newItem = Object.assign({ id: Id }, req.body)
  data.push(newItem);
  fs.writeFile(`${__dirname}/data/portfolio.json`, JSON.stringify(data), err => {
    res.status(201).json({
      status: "success",
      message: "File written"
    })
  })
}
const getPortfolioItem = (req, res) => {
  let { id } = req.params;
  id *= 1;
  const queryResult = data.find(el => el.id == id);
  if (!queryResult) {
    res.status(404).json({
      status: "failure",
      message: "Item not found"
    })
  } else {
    res.status(404).json({
      status: "success",
      portfolioItem: queryResult
    })
  }
}

const updatePortfolioItem = (req, res) => {
  let { id } = req.params;
  id *= 1;
  const queryResult = data.find(el => el.id == id);
  if (!queryResult) {
    res.status(404).json({
      status: "failure",
      message: "Item not found"
    })
  } else {
    res.status(404).json({
      status: "success",
      portfolioItem: queryResult
    })
  }
}

const deletePortfolioItem = (req, res) => {
  let { id } = req.params;
  id *= 1;
  const queryResult = data.find(el => el.id == id);
  if (!queryResult) {
    res.status(404).json({
      status: "failure",
      message: "Item not found"
    })
  } else {
    res.status(404).json({
      status: "success",
      portfolioItem: null
    })
  }
}

app.route('/api/v1/portfolios')
  .get(getAllPortfolioItems)
  .post(createPortfolioItem)
app.route('/api/v1/portfolios/:id')
  .get(getPortfolioItem)
  .patch(updatePortfolioItem)
  .delete(deletePortfolioItem)



app.listen(port, () => {
  console.log(`App running on port ${3000}`);
})



