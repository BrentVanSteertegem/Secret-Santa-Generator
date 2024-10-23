const nodemailer = require("nodemailer");
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

async function sendEmail(from, to) {
  // Read the image file
  const imageAttachment = await readFileAsync('./src/assets/background.jpg');

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASS,
      },
  });

  //TODO: Add actual email content
  // Send email
  const info = await transporter.sendMail({
      from: process.env.MAIL_AUTH_USER,
      to: process.env.MAIL_TEST_TO,
      subject: 'Your Subject',
      html: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Awesome Email</title>
            </head>
            <body>
                <h1>Hello ${from}, you need to buy a gift for ${to}!</h1>
                <img src="cid:uniqueImageCID" alt="Embedded Image">
                <p>Thank you for reading!</p>
            </body>
        </html>
      `,
      attachments: [{
          filename: 'background.jpg',
          content: imageAttachment,
          encoding: 'base64',
          cid: 'uniqueImageCID', // Referenced in the HTML template
      }],
  });

  console.log('Email sent:', info.messageId);
}