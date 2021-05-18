const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');

const ibworkMailer = async (options) => {
  const {
    name, email, phone, message, select,
  } = options;
  const opt = {
    auth: {
      api_key: process.env.SENDGRID,
    },
  };
  const transport = nodemailer.createTransport(sendgrid(opt));
  await transport.sendMail({
    to: 'vitalimelnic@yahoo.com',
    from: 'thenewyoungcoder@gmail.com',
    subject: 'New message from vitaliemelnic.tech',
    html: `<h2>You have got an email from ${name}</h2>
    <h4>This person's email is: ${email}</h4>
    <h3>Phone:  ${phone}</h3>
    <p><strong>Purpose:  </strong>${select}</p>
    <p><strong>With the message being:  </strong>${message}</p>
    `,
  });
};

module.exports = ibworkMailer;