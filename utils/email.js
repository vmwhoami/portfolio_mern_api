const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');

const sendEmail = async (options) => {
  const { name, email, subject, message } = options
  const opt = {
    auth: {
      api_key: process.env.SENDGRID,
    },
  };
  const transport = nodemailer.createTransport(sendgrid(opt));
  await transport.sendMail({
    to: 'vmwhoami@gmail.com',
    from: 'thenewyoungcoder@gmail.com',
    subject: 'New message from vitaliemelnic.tech',
    html: `<h2>You have got an email from ${name}</h2>
    <h4>This person's email is: ${email}</h4>
    <h3>Subject:  ${subject}</h3>
    <p><strong>With the message being:  </strong>${message}</p>
    `,
  });

};

module.exports = sendEmail;