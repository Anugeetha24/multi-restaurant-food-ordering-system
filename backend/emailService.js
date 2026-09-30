const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const getSmtpTransport = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const username = process.env.SMTP_USERNAME;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !username || !password) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USERNAME and SMTP_PASSWORD.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: username, pass: password },
  });
};

const sendPasswordResetEmail = async (toEmail, resetLink) => {
  const from = process.env.SMTP_FROM || process.env.SMTP_USERNAME;
  const transport = getSmtpTransport();

  await transport.sendMail({
    from,
    to: toEmail,
    subject: 'Reset your Foody App password',
    text: `Reset your Foody App password using this link (valid for 15 minutes): ${resetLink}`,
    html: `<p>Reset your Foody App password using the link below.</p><p><a href="${resetLink}">Reset password</a></p><p>This link expires in 15 minutes.</p>`,
  });
};

module.exports = { sendPasswordResetEmail };