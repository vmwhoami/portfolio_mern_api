const experss = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const UserRouter = require('./routers/userRoutes');
const PortfolioRouter = require('./routers/portfolioRoutes');
const LoginRouter = require('./routers/loginRouter');
const BlogRouter = require('./routers/blogRouter');

const app = experss();

app.use(experss.json());
app.use(morgan('dev'));

require('./models/User');
require('./models/Portfolio');


app.use((req, res, next) => {
  res.timpulCerrerii = new Date().toISOString();
  next();
});

mongoose.connect(process.env.mongoURL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
mongoose.connection.on('connected', () => {
  console.log('Connection established');
});

app.use(experss.static(`${__dirname}/data`));
app.use('/api/v1/portfolios', PortfolioRouter);
app.use('/api/v1/blog', BlogRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/login', LoginRouter);
mongoose.connection.on('error', (err) => {
  console.log('There was an error connecting to the DB', err);
});

module.exports = app;
