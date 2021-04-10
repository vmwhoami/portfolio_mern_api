const experss = require('express');
const morgan = require('morgan');
const UserRouter = require('./routers/userRoutes');
const PortfolioRouter = require('./routers/portfolioRoutes');

const app = experss();
app.use(experss.json());

app.use(morgan('dev'));
app.use((req, res, next) => {
  res.timpulCerrerii = new Date().toISOString();
  next();
});


app.use('/api/v1/users', UserRouter);
app.use('/api/v1/portfolios', PortfolioRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${3000}`);
});
