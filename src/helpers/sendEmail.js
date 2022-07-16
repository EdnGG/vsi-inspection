// // const nodemailer = require("nodemailer");


// export const sendEmail = async () => {
//   try {
  
//     // Transporter object
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_ADMIN,
//         pass: process.env.PASSWORD_EMAIL_ADMIN,
//       },
//     });

//     // Message object
//     const message = await transporter.sendMail({
//       from: 'gresseden@gmail.com', // sender address
//       to: "jonaviles66@yahoo.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
    
//   } catch (err) { 
//     console.log(err);
//   }

// }

