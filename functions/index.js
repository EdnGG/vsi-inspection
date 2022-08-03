require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN_CLOUD,
});
admin.initializeApp(functions.config().firebase);
// FIREBASE FUNCTIONS
exports.sendEmail = functions.firestore
  .document("inspections/{inspectionsId}")
  .onCreate( async (snap, context) => {
    // const doc = snap.data();
    // console.log("snap.data(): ", snap.data());
// // ${process.env.EMAIL_RECEIPE_1}, ${process.env.EMAIL_RECEIPE_2}`,
    const data = {
      from: `noreply@inspection-6c319.web.app/`,
      to: `${process.env.EMAIL_ADMIN}, ${process.env.EMAIL_RECEIPE_1}, ${process.env.EMAIL_RECEIPE_2}`,
      subject: "Inspection Report",
      html: `
      <div>
      <h1>Inspection Report</h1>
      </div>
      <div>
      <h2>A electric actuators inspection has been carried out with the following PO: <bold>${snap.data().inspection.id}</bold> </h2>
      </div>
      <div>
      <h2>Inspection Details</h2>
      <h3>Date: ${snap.data().inspection.date}</h3>
      <h3>Observations: ${snap.data().inspection.observaciones}</h3>
      <h3>Made by: ${snap.data().inspection.technical}</h3>
      </div>
      <div>
      <h2>Please click on the image to login or signup to see more details</h2>
      <a href="https://inspection-6c319.web.app/">
        <img src="https://www.zoro.com/static/cms/product/full/VSI%20LLC_1020xxXxxc1c49b.jpeg" alt="logo" />
      </a>
      </div>
      <div>
        <p>
        please check your spam folder if you dont see the email
        </p>
      </div>
      `,
    };
   await mg.messages().send(data, (error, body) => {
      console.log('data: ', data)
      console.log('body: ', body)
      if (error) {
        return console.log(`error: `, error);
      }
      return console.log(`email send it `, body);
    });

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // const msg = {
    //   to: process.env.EMAIL_ADMIN, process.env.EMAIL_RECEIPE_1, process.env.EMAIL_RECEIPE_1  // Change to your recipient
    //   from: process.env.EMAIL_ADMIN, // Change to your verified sender
    //   subject: "Sending with SendGrid is Fun",
    //   text: "and easy to do anywhere, even with Node.js",
    //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    // };
    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log("Email sent");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  });