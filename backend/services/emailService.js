const nodemailer = require("nodemailer");
const { default: hbs } = require("nodemailer-express-handlebars");
const path = require("path");

function sendNotifications(subject, recipient, template, appointmentDetail) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve(__dirname, "../emails"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../emails"),
    extName: ".hbs",
  };
  const mailOptions = {
   from: '"Schedula" <schedula.ca@gmail.com>',
   to: recipient,
   subject: subject,
   template: template,
   context:appointmentDetail
  };
  transporter.use("compile", hbs(handlebarOptions));
  transporter.sendMail(mailOptions);
}

module.exports = sendNotifications;
