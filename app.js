const experss = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const UserRouter = require('./routers/userRoutes');
const PortfolioRouter = require('./routers/portfolioRoutes');
const LoginRouter = require('./routers/loginRouter');
const BlogRouter = require('./routers/blogRouter');
const ContactsRouter = require('./routers/contactsRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = experss();
app.use(experss.json());
app.use(morgan('dev'));

// Implement Cors

app.use(cors());

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
mongoose.connection.on('error', (err) => {
  console.log('There was an error connecting to the DB', err);
});
app.use(experss.static(`${__dirname}/data`));
app.use('/api/v1/contacts', ContactsRouter);
app.use('/api/v1/portfolios', PortfolioRouter);
app.use('/api/v1/blog', BlogRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/login', LoginRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);


module.exports = app;
