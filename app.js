const experss = require('express');
const morgan = require('morgan');
const UserRouter = require('./routers/userRoutes');
const PortfolioRouter = require('./routers/portfolioRoutes');
const mongoose = require('mongoose')
const connectionStr = require('./config/keys').mongoURL;
require('./models/Portfolio');
const app = experss();
app.use(experss.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.timpulCerrerii = new Date().toISOString();
  next();
});
//Establishinh
mongoose.connect(connectionStr, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
  console.log("Connection established");
})

app.use(experss.static(`${__dirname}/data`));
app.use('/api/v1/portfolios', PortfolioRouter);
app.use('/api/v1/users', UserRouter);
mongoose.connection.on('error', (err) => {
  console.log("There was an error connecting to the DB", err);
})





module.exports = app;
