const experss = require('express');
const morgan = require('morgan');
const UserRouter = require('./routers/userRoutes');
const PortfolioRouter = require('./routers/portfolioRoutes');
const db = require('./config/keys').mongoURL;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://vmwhoami:gi0PONRAUDGLXfb@cluster0.v26nz.mongodb.net/listingsAndReviews?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


const app = experss();
app.use(experss.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.timpulCerrerii = new Date().toISOString();
  next();
});


app.use('/api/v1/users', UserRouter);
app.use('/api/v1/portfolios', PortfolioRouter);


module.exports = app;
