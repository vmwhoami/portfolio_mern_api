const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
// service: 'Gmail',
// auth: {
//   user: process.env.EMAIL_USERNAME,
//   pass: process.env.EMAIL_PASSWORD
// }
const sendEmail = async (options) => {
  // 1) Create a transporter
  const opt = {
    auth: {
      api_key: process.env.SENDGRID,
    },
  };
  const transport = nodemailer.createTransport(sendgrid(opt));
  transport.sendMail(options);
};

module.exports = sendEmail;