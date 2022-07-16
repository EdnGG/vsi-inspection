// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

 // Transporter object
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.PASSWORD_EMAIL_ADMIN,
  },
});


exports.sendEmail = functions.firestore
  .document("/inspections/{inspectionsId}")
  .onCreate((snap, context) => {
    const data = snap.data();
    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: process.env.EMAIL_ADMIN,
      subject: "Inspection created",
      text: `Inspection created: ${data.inspection}`,
    };
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
          console.log(error)
          return
      }
      console.log("Sent!")
  });
  })


