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
// to: `${process.env.EMAIL_ADMIN}, ${process.env.EMAIL_RECEIPE_1}, ${process.env.EMAIL_RECEIPE_2}`,
    const data = {
      from: `noreply@inspection-6c319.web.app/`,
      to: `${process.env.EMAIL_ADMIN}`,
      subject: "Inspection Report",
      html: `
    <body
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0; 
        padding: 0; 
        font-family: Arial, 
        Helvetica, sans-serif; 
        line-height: 1.5; 
      "
    >  
    <div 
      style="
        background-color: rgb(5, 0, 0);
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <div
        style="
          width: 80%;
          height: 15vh;
          font-size: 1.3em;
          font-weight: bold;
          color: #fff;
          background-color: green;
          padding: 0.5em;
          margin: 0.5em;
          display: flex;
          flex-direction: row;
        "
      >
      <img  
        style="
          width: 80px;
          height: 80px;
          margin: 1em;
        "
        src="https://valvesolutions.com/wp-content/uploads/2020/12/Valve-Solutions-Logo-1-150x72-1.png"
        alt="logo"
      >
        <h1
          style="
            margin: auto;
            display: flex;
            align-content: center;
            text-align: center;
          "
        >
          Electric Actuators Inspection Report
        </h1>
      </div>
      <div
        style="
          width: 80%;
          height: 20vh;
          font-size: 1.5em;
          font-weight: bold;
          color: #fff;
          padding: 0.5em;
          margin: 0.5em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <h2
          style="
            margin: auto;
            display: flex;
            align-content: center;
            text-align: center;
          "
        >
          An Electric Actuators Inspection has been carried out with the
          following PO:
        </h2>
        <h3><bold>${snap.data().inspection.id}</bold></h3>
      </div>
      <div 
        style= "
          width: 80%;
          font-size: 1.5em;
          font-weight: bold;
          color: rgb(105, 165, 26);
          padding: 0.5em;
          margin: 0.5em;
        "
      >
        <h2 style="text-align: center;">Inspection Details</h2>
        <h3>Date: ${snap.data().inspection.date}</h3>
        <h3>Observations: ${snap.data().inspection.observaciones}</h3>
        <h3>Technical Name: ${snap.data().inspection.technical}</h3>
      </div>
      <div
        style="
          width: 80%;
          height: 20vh;
          font-size: 1.5em;
          font-weight: bold;
          color: blue;
          padding: 0.5em;
          margin: 0.5em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;"
      >
        <h2
          style="
            color: #fff;
            margin: auto;
            display: flex;
            align-content: center;
            text-align: center;
          "
        >
          Please click on the botton to login or signup to see more details
        </h2>
        <button 
          style="
            border-radius: 500px;
            width: 300px;
            height: 50px;
            font-size: 1.5em;
            font-weight: bold;
            color: #fff;
            background-color: rgb(175, 182, 175);
            padding: 1em;
            margin: 1em;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;"
            
        >
          <a 
            href="https://inspection-6c319.web.app/"
            style="
              text-decoration: none;
              color: #fff;
            ""
          >
          Login</a>
        </button>
        
      </div>
      <div>
        <p style="
          font-size: 1.5em;
          font-weight: bold;
          color: #fff;
          padding: 0.5em;
          margin: 0.5em;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;"
        >please check your spam folder if you dont see the email</p>
      </div>
    </div>
    </body>
      `
      ,
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