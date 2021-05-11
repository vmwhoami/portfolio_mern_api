const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${3000}`);
});

process.on('unhandledRejection', err => {
  console.log(err);
  console.log('UNHANDLED REJECTION!!! Shutting down ...');
  server.close(() => {
    process.exit(1)
  })
})
