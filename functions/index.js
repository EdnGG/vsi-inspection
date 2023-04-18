require('dotenv').config();

// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const jsPDF = require('jspdf');
// const autoTable = require('jspdf-autotable');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mailgun = require('mailgun-js');
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN_CLOUD,
});

const PDFDocument = require('pdfkit');

// const pdfGenerator = require('./helpers/pdfGenerator');
// const pdfGenerator2 = require('./helpers/pdfGenerator2');

admin.initializeApp(functions.config().firebase);

// FIREBASE FUNCTIONS EXAMPLE 1
// exports.sendEmail = functions.firestore
//   .document('inspections/{inspectionsId}')
//   .onCreate(async (snap, context) => {
//     try {
//       console.log('dataPDF: ', snap.data().inspection);

//       // const pdfContent = await pdfGenerator2(snap.data().inspection);
//       // const filename = `${snap.id}_${new Date().toISOString()}.pdf`;

//       // const attachment = {
//       //   data: pdfContent,
//       //   filename: filename,
//       //   contentType: 'application/pdf',
//       // };

//       const data = {
//         from: `noreply@inspection-6c319.web.app/`,
//         to: `${process.env.EMAIL_ADMIN}`,
//         // to: `${process.env.EMAIL_ADMIN}, ${process.env.EMAIL_RECEIPE_1}, ${process.env.EMAIL_RECEIPE_2}, ${process.env.EMAIL_RECEIPE_3}, ${process.env.EMAIL_RECEIPE_4}, ${process.env.EMAIL_RECEIPE_5}`,
//         subject: 'Inspection Report',
//         // attachment: [attachment],

//         // html: `
//         // <!DOCTYPE html>

//         // <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

//         // <head>
//         //   <title>Electric Actuators Inspection</title>
//         //   <!--[if !mso]><!-->
//         //   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//         //   <!--<![endif]-->
//         //   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//         // </head>

//         // <body>
//         //   <div>
//         //     <h1>Inspection Report</h1>
//         //     <p>Number: ${dataPdf.id}</p>
//         //     <p>Date: ${dataPdf.date}</p>
//         //     <p>Technical: ${dataPdf.technical}</p>
//         //     <p>Actuator Model: ${dataPdf.actuatorModel}</p>
//         //     <p>Actuator Serial Number: ${dataPdf.actuatorSerialNumber}</p>
//         //     <p>Control Pack: ${dataPdf.controlPack}</p>
//         //     <p>Visual: ${dataPdf.visual}</p>
//         //     <p>Water Inspection: ${dataPdf.waterInspection}</p>
//         //     <p>Operational Test: ${dataPdf.operationalTest}</p>
//         //     <p>Wire Compartiment: ${dataPdf.wireCompartiment}</p>
//         //     <p>Handwheel Bolt Patern: ${dataPdf.handwheelBoltPatern}</p>
//         //     <p>Observations: ${dataPdf.observaciones}</p>
//         //   </div>
//         // </body>

//         // </html>
//         // `,

//         html: `
//               <!DOCTYPE html>
//         <html
//           xmlns="http://www.w3.org/1999/xhtml"
//           xmlns:v="urn:schemas-microsoft-com:vml"
//           xmlns:o="urn:schemas-microsoft-com:office:office"
//         >
//           <head>
//             <title>Electric Actuators Inspection</title>
//             <!--[if !mso]><!-->
//             <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//             <!--<![endif]-->
//             <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//             <meta name="viewport" content="width=device-width,initial-scale=1" />
//             <style type="text/css">
//               #outlook a {
//                 padding: 0;
//               }
//               body {
//                 margin: 0;
//                 padding: 0;
//                 -webkit-text-size-adjust: 100%;
//                 -ms-text-size-adjust: 100%;
//               }
//               table,
//               td {
//                 border-collapse: collapse;
//                 mso-table-lspace: 0pt;
//                 mso-table-rspace: 0pt;
//               }
//               img {
//                 border: 0;
//                 height: auto;
//                 line-height: 100%;
//                 outline: none;
//                 text-decoration: none;
//                 -ms-interpolation-mode: bicubic;
//               }
//               p {
//                 display: block;
//                 margin: 13px 0;
//               }
//             </style>
//             <!--[if mso]>
//               <noscript>
//                 <xml>
//                   <o:OfficeDocumentSettings>
//                     <o:AllowPNG />
//                     <o:PixelsPerInch>96</o:PixelsPerInch>
//                   </o:OfficeDocumentSettings>
//                 </xml>
//               </noscript>
//             <![endif]-->
//             <!--[if lte mso 11]>
//               <style type="text/css">
//                 .mj-outlook-group-fix {
//                   width: 100% !important;
//                 }
//               </style>
//             <![endif]-->
//             <style type="text/css">
//               @media only screen and (min-width: 480px) {
//                 .mj-column-per-100 {
//                   width: 100% !important;
//                   max-width: 100%;
//                 }
//               }
//             </style>
//             <style media="screen and (min-width:480px)">
//               .moz-text-html .mj-column-per-100 {
//                 width: 100% !important;
//                 max-width: 100%;
//               }
//             </style>
//             <style type="text/css">
//               @media only screen and (max-width: 480px) {
//                 table.mj-full-width-mobile {
//                   width: 100% !important;
//                 }
//                 td.mj-full-width-mobile {
//                   width: auto !important;
//                 }
//               }
//             </style>
//           </head>
//           <body style="word-spacing: normal; background-color: #e7e7e7">
//             <div
//               style="
//                 display: none;
//                 font-size: 1px;
//                 color: #ffffff;
//                 line-height: 1px;
//                 max-height: 0px;
//                 max-width: 0px;
//                 opacity: 0;
//                 overflow: hidden;
//               "
//             >
//               Electric Actuators Inspection
//             </div>
//             <div style="background-color: #e7e7e7">
//               <table
//                 align="center"
//                 border="0"
//                 cellpadding="0"
//                 cellspacing="0"
//                 role="presentation"
//                 style="background: #008000; background-color: #008000; width: 100%"
//               >
//                 <tbody>
//                   <tr>
//                     <td>
//                       <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#008000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
//                       <div style="margin: 0px auto; max-width: 600px">
//                         <table
//                           align="center"
//                           border="0"
//                           cellpadding="0"
//                           cellspacing="0"
//                           role="presentation"
//                           style="width: 100%"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   direction: ltr;
//                                   font-size: 0px;
//                                   padding: 20px 0;
//                                   padding-bottom: 0;
//                                   text-align: center;
//                                 "
//                               >
//                                 <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
//                                 <div
//                                   class="mj-column-per-100 mj-outlook-group-fix"
//                                   style="
//                                     font-size: 0px;
//                                     text-align: left;
//                                     direction: ltr;
//                                     display: inline-block;
//                                     vertical-align: top;
//                                     width: 100%;
//                                   "
//                                 >
//                                   <table
//                                     border="0"
//                                     cellpadding="0"
//                                     cellspacing="0"
//                                     role="presentation"
//                                     style="vertical-align: top"
//                                     width="100%"
//                                   >
//                                     <tbody>
//                                       <tr>
//                                         <td
//                                           align="center"
//                                           style="
//                                             font-size: 0px;
//                                             padding: 10px 25px;
//                                             word-break: break-word;
//                                           "
//                                         >
//                                           <table
//                                             border="0"
//                                             cellpadding="0"
//                                             cellspacing="0"
//                                             role="presentation"
//                                             style="
//                                               border-collapse: collapse;
//                                               border-spacing: 0px;
//                                             "
//                                           >
//                                             <tbody>
//                                               <tr>
//                                                 <td style="width: 150px">
//                                                   <img
//                                                     alt
//                                                     height="auto"
//                                                     src="https://valvesolutions.com/wp-content/uploads/2020/12/Valve-Solutions-Logo-1-150x72-1.png"
//                                                     style="
//                                                       border: 0;
//                                                       display: block;
//                                                       outline: none;
//                                                       text-decoration: none;
//                                                       height: auto;
//                                                       width: 100%;
//                                                       font-size: 13px;
//                                                     "
//                                                     width="150"
//                                                   />
//                                                 </td>
//                                               </tr>
//                                             </tbody>
//                                           </table>
//                                         </td>
//                                       </tr>
//                                       <tr>
//                                         <td
//                                           align="center"
//                                           style="
//                                             font-size: 0px;
//                                             padding: 10px 25px;
//                                             padding-top: 30px;
//                                             word-break: break-word;
//                                           "
//                                         >
//                                           <div
//                                             style="
//                                               font-family: 'Helvetica Neue', Helvetica,
//                                                 Arial, sans-serif;
//                                               font-size: 16px;
//                                               font-weight: bold;
//                                               letter-spacing: 1px;
//                                               line-height: 24px;
//                                               text-align: center;
//                                               text-transform: uppercase;
//                                               color: #ffffff;
//                                             "
//                                           >
//                                             Electric Actuators Inspection Report
//                                           </div>
//                                         </td>
//                                       </tr>
//                                     </tbody>
//                                   </table>
//                                 </div>
//                                 <!--[if mso | IE]></td></tr></table><![endif]-->
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                       <!--[if mso | IE]></td></tr></table><![endif]-->
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="body-section-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
//               <div
//                 class="body-section"
//                 style="
//                   -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
//                   -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
//                   box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
//                   margin: 0px auto;
//                   max-width: 600px;
//                 "
//               >
//                 <table
//                   align="center"
//                   border="0"
//                   cellpadding="0"
//                   cellspacing="0"
//                   role="presentation"
//                   style="width: 100%"
//                 >
//                   <tbody>
//                     <tr>
//                       <td
//                         style="
//                           direction: ltr;
//                           font-size: 0px;
//                           padding: 20px 0;
//                           padding-bottom: 0;
//                           padding-top: 0;
//                           text-align: center;
//                         "
//                       >
//                         <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
//                         <div
//                           style="
//                             background: #ffffff;
//                             background-color: #ffffff;
//                             margin: 0px auto;
//                             max-width: 600px;
//                           "
//                         >
//                           <table
//                             align="center"
//                             border="0"
//                             cellpadding="0"
//                             cellspacing="0"
//                             role="presentation"
//                             style="
//                               background: #ffffff;
//                               background-color: #ffffff;
//                               width: 100%;
//                             "
//                           >
//                             <tbody>
//                               <tr>
//                                 <td
//                                   style="
//                                     direction: ltr;
//                                     font-size: 0px;
//                                     padding: 20px 0;
//                                     padding-left: 15px;
//                                     padding-right: 15px;
//                                     text-align: center;
//                                   "
//                                 >
//                                   <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]-->
//                                   <div
//                                     class="mj-column-per-100 mj-outlook-group-fix"
//                                     style="
//                                       font-size: 0px;
//                                       text-align: left;
//                                       direction: ltr;
//                                       display: inline-block;
//                                       vertical-align: top;
//                                       width: 100%;
//                                     "
//                                   >
//                                     <table
//                                       border="0"
//                                       cellpadding="0"
//                                       cellspacing="0"
//                                       role="presentation"
//                                       style="vertical-align: top"
//                                       width="100%"
//                                     >
//                                       <tbody>
//                                         <tr>
//                                           <td
//                                             align="left"
//                                             style="
//                                               font-size: 0px;
//                                               padding: 10px 25px;
//                                               word-break: break-word;
//                                             "
//                                           >
//                                             <div
//                                               style="
//                                                 font-family: 'Helvetica Neue', Helvetica,
//                                                   Arial, sans-serif;
//                                                 font-size: 20px;
//                                                 font-weight: bold;
//                                                 line-height: 24px;
//                                                 text-align: left;
//                                                 color: #212b35;
//                                               "
//                                             >
//                                               An Electric Actuators Inspection has been
//                                               carried out with the following PO:
//                                             </div>
//                                           </td>
//                                         </tr>
//                                         <tr>
//                                           <td
//                                             align="center"
//                                             style="
//                                               font-size: 0px;
//                                               padding: 10px 25px;
//                                               word-break: break-word;
//                                             "
//                                           >
//                                             <div
//                                               style="
//                                                 font-family: 'Helvetica Neue', Helvetica,
//                                                   Arial, sans-serif;
//                                                 font-size: 16px;
//                                                 font-weight: 400;
//                                                 line-height: 24px;
//                                                 text-align: center;
//                                                 color: #637381;
//                                               "
//                                             >
//                                               ${snap.data().inspection.id}
//                                             </div>
//                                           </td>
//                                         </tr>
//                                         <tr>
//                                           <td
//                                             align="center"
//                                             style="
//                                               font-size: 0px;
//                                               padding: 10px 25px;
//                                               word-break: break-word;
//                                             "
//                                           >
//                                             <div
//                                               style="
//                                                 font-family: 'Helvetica Neue', Helvetica,
//                                                   Arial, sans-serif;
//                                                 font-size: 18px;
//                                                 font-weight: bold;
//                                                 line-height: 24px;
//                                                 text-align: center;
//                                                 color: #212b35;
//                                               "
//                                             >
//                                               Inspection Details
//                                             </div>
//                                           </td>
//                                         </tr>
//                                         <tr>
//                                           <td
//                                             align="left"
//                                             style="
//                                               font-size: 0px;
//                                               padding: 10px 25px;
//                                               word-break: break-word;
//                                             "
//                                           >
//                                             <div
//                                               style="
//                                                 font-family: 'Helvetica Neue', Helvetica,
//                                                   Arial, sans-serif;
//                                                 font-size: 16px;
//                                                 font-weight: 400;
//                                                 line-height: 24px;
//                                                 text-align: left;
//                                                 color: #637381;
//                                               "
//                                             >
//                                               <ul>
//                                                 <li style="padding-bottom: 20px">
//                                                   <strong>Date:</strong>
//                                                   ${snap.data().inspection.date}
//                                                 </li>
//                                                 <li style="padding-bottom: 20px">
//                                                   <strong>Observations:</strong>
//                                                   ${
//                                                     snap.data().inspection
//                                                       .observaciones
//                                                   }
//                                                 </li>
//                                                 <li>
//                                                   <strong>Technical Name:</strong>
//                                                   ${
//                                                     snap.data().inspection
//                                                       .technical
//                                                   }
//                                                 </li>
//                                               </ul>
//                                             </div>
//                                           </td>
//                                         </tr>
//                                         <tr>
//                                           <td
//                                             align="center"
//                                             vertical-align="middle"
//                                             style="
//                                               font-size: 0px;
//                                               padding: 10px 25px;
//                                               word-break: break-word;
//                                             "
//                                           >
//                                             <table
//                                               border="0"
//                                               cellpadding="0"
//                                               cellspacing="0"
//                                               role="presentation"
//                                               style="
//                                                 border-collapse: separate;
//                                                 width: 300px;
//                                                 line-height: 100%;
//                                               "
//                                             >
//                                               <tbody>

//                                                 <tr>
//                                                   <td
//                                                     align="center"
//                                                     bgcolor="#008000"
//                                                     role="presentation"
//                                                     style="
//                                                       border: none;
//                                                       border-radius: 3px;
//                                                       cursor: auto;
//                                                       mso-padding-alt: 10px 25px;
//                                                       background: #008000;
//                                                     "
//                                                     valign="middle"
//                                                   >
//                                                     <a
//                                                       href="https://inspection-6c319.web.app/"
//                                                       style="
//                                                         display: inline-block;
//                                                         width: 250px;
//                                                         background: #008000;
//                                                         color: #ffffff;
//                                                         font-family: 'Helvetica Neue',
//                                                           Helvetica, Arial, sans-serif;
//                                                         font-size: 17px;
//                                                         font-weight: bold;
//                                                         line-height: 120%;
//                                                         margin: 0;
//                                                         text-decoration: none;
//                                                         text-transform: none;
//                                                         padding: 10px 25px;
//                                                         mso-padding-alt: 0px;
//                                                         border-radius: 3px;
//                                                       "
//                                                       target="_blank"
//                                                       >Go to Website</a
//                                                     >
//                                                   </td>
//                                                 </tr>

//                                                 <tr>
//                                                 <td
//                                                   align="center"
//                                                   vertical-align="middle"
//                                                   style="
//                                                     font-size: 0px;
//                                                     padding: 10px 25px;
//                                                     word-break: break-word;
//                                                   "
//                                                 >
//                                                   <table
//                                                     border="0"
//                                                     cellpadding="0"
//                                                     cellspacing="0"
//                                                     role="presentation"
//                                                     style="
//                                                       border-collapse: separate;
//                                                       width: 300px;
//                                                       line-height: 100%;
//                                                     "
//                                                   >
//                                                     <tbody>
//                                               </tbody>
//                                             </table>
//                                           </td>
//                                         </tr>
//                                       </tbody>
//                                     </table>
//                                   </div>
//                                   <!--[if mso | IE]></td></tr></table><![endif]-->
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </div>
//                         <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <!--[if mso | IE]></td></tr></table><![endif]-->
//               <table
//                 align="center"
//                 border="0"
//                 cellpadding="0"
//                 cellspacing="0"
//                 role="presentation"
//                 style="width: 100%"
//               >
//                 <tbody>
//                   <tr>
//                     <td>
//                       <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
//                       <div style="margin: 0px auto; max-width: 600px">
//                         <table
//                           align="center"
//                           border="0"
//                           cellpadding="0"
//                           cellspacing="0"
//                           role="presentation"
//                           style="width: 100%"
//                         >
//                           <tbody>
//                             <tr>
//                               <td
//                                 style="
//                                   direction: ltr;
//                                   font-size: 0px;
//                                   padding: 20px 0;
//                                   text-align: center;
//                                 "
//                               >
//                                 <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
//                                 <div style="margin: 0px auto; max-width: 600px">
//                                   <table
//                                     align="center"
//                                     border="0"
//                                     cellpadding="0"
//                                     cellspacing="0"
//                                     role="presentation"
//                                     style="width: 100%"
//                                   >
//                                     <tbody>
//                                       <tr>
//                                         <td
//                                           style="
//                                             direction: ltr;
//                                             font-size: 0px;
//                                             padding: 20px 0;
//                                             padding-top: 0;
//                                             text-align: center;
//                                           "
//                                         >
//                                           <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="width:600px;" ><![endif]-->
//                                           <div
//                                             class="mj-column-per-100 mj-outlook-group-fix"
//                                             style="
//                                               font-size: 0;
//                                               line-height: 0;
//                                               text-align: left;
//                                               display: inline-block;
//                                               width: 100%;
//                                               direction: ltr;
//                                             "
//                                           >
//                                             <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td style="vertical-align:top;width:600px;" ><![endif]-->
//                                             <div
//                                               class="mj-column-per-100 mj-outlook-group-fix"
//                                               style="
//                                                 font-size: 0px;
//                                                 text-align: left;
//                                                 direction: ltr;
//                                                 display: inline-block;
//                                                 vertical-align: top;
//                                                 width: 100%;
//                                               "
//                                             >
//                                               <table
//                                                 border="0"
//                                                 cellpadding="0"
//                                                 cellspacing="0"
//                                                 role="presentation"
//                                                 width="100%"
//                                               >
//                                                 <tbody>
//                                                   <tr>
//                                                     <td
//                                                       style="
//                                                         vertical-align: top;
//                                                         padding-right: 0;
//                                                       "
//                                                     >
//                                                       <table
//                                                         border="0"
//                                                         cellpadding="0"
//                                                         cellspacing="0"
//                                                         role="presentation"
//                                                         width="100%"
//                                                       >
//                                                         <tbody></tbody>
//                                                       </table>
//                                                     </td>
//                                                   </tr>
//                                                 </tbody>
//                                               </table>
//                                             </div>
//                                             <!--[if mso | IE]></td></tr></table><![endif]-->
//                                           </div>
//                                           <!--[if mso | IE]></td></tr></table><![endif]-->
//                                         </td>
//                                       </tr>
//                                     </tbody>
//                                   </table>
//                                 </div>
//                                 <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                       <!--[if mso | IE]></td></tr></table><![endif]-->
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </body>
//         </html>
//         `,
//       };

//       await mg.messages().send(data, (error, body) => {
//         if (error) {
//           console.log(`Error trying to send email: `, error.message);
//           throw new Error(error.message);
//         }
//         return console.log(`Email sent successfully `, body);
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   });

// EXAMPLE 2

// Create a function to generate a pdf table using jsPDF and jspdf-autotable
// const pdfGenerator = async (data, title = 'VSI Incomming report') => {
//   const NUMBER_MAX_COLUMNS = 9;
//   const headerBody = [
//     'Actuator Model',
//     'Actuator Serial Number',
//     'Control Pack',
//     'Visual',
//     'Water Inspection',
//     'Operational Test',
//     'Wire Compartiment',
//     'Handwheel Bolt Patern',
//     'Observations',
//   ];

//   const body = await data.data.map((item) => {
//     return [
//       item.actuatorModel,
//       item.actuatorSerialNumber,
//       item.controlPack,
//       item.visual,
//       item.waterInspection,
//       item.operationalTest,
//       item.wireCompartiment,
//       item.handwheelBoltPatern,
//       item.observaciones,
//     ];
//   });

//   const doc = await new jsPDF({
//     orientation: 'landscape',
//     unit: 'mm',
//     format: 'a4',
//   });

//   autoTable(doc, {
//     theme: 'grid',
//     font: 'helvetica',
//     cellWidth: 'wrap',
//     head: [
//       [
//         {
//           content: title,
//           colSpan: 9,
//           styles: { halign: 'center', fontSize: 16 },
//         },
//       ],
//     ],
//     body: [
//       [
//         { content: `Number: ${data.id}`, colSpan: NUMBER_MAX_COLUMNS / 3 },
//         { content: `Date: ${data.date}`, colSpan: NUMBER_MAX_COLUMNS / 3 },
//         {
//           content: `Technical: ${data.technical}`,
//           colSpan: NUMBER_MAX_COLUMNS / 3,
//         },
//       ],
//       headerBody,
//       ...body,
//       [
//         {
//           content: 'Final notes:',
//           colSpan: 2,
//           styles: {
//             fillColor: 'green',
//             textColor: '#ffffff',
//           },
//         },
//         { content: data.observaciones, colSpan: NUMBER_MAX_COLUMNS - 2 },
//       ],
//     ],
//   });

//   doc.save(`inspection-${data.date}.pdf`);
// };

// require('dotenv').config();

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const mailgun = require('mailgun-js');
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILGUN_DOMAIN_CLOUD,
// });

// const PDFDocument = require('pdfkit');

// admin.initializeApp(functions.config().firebase);

// FIREBASE FUNCTIONS  CHATGPT EXAMPLE
exports.sendEmail = functions.firestore
  .document('inspections/{inspectionsId}')
  .onCreate(async (snap, context) => {
    try {
      console.log('dataPDF: ', snap.data().inspection);

      // Create a new PDF document
      const doc = new PDFDocument();

      // Set document properties
      doc.title('Inspection Report');
      doc.author('Your Name');
      doc.subject('Inspection Report');
      doc.keywords('inspection, report');

      // Create table header
      const tableHeader = [
        'ID',
        'Date',
        'Technical',
        'Actuator Model',
        'Actuator Serial Number',
        'Control Pack',
        'Visual',
        'Water Inspection',
        'Operational Test',
        'Wire Compartiment',
        'Handwheel Bolt Patern',
        'Observations',
      ];

      // Create table data
      const tableData = [
        snap.id,
        snap.data().date,
        snap.data().technical,
        snap.data().actuatorModel,
        snap.data().actuatorSerialNumber,
        snap.data().controlPack,
        snap.data().visual,
        snap.data().waterInspection,
        snap.data().operationalTest,
        snap.data().wireCompartiment,
        snap.data().handwheelBoltPatern,
        snap.data().observaciones,
      ];

      // Set the font size
      doc.fontSize(12);

      // Add the table to the document
      doc.table([tableHeader, tableData], {
        prepareHeader: () => doc.font('Helvetica-Bold'),
        prepareRow: () => doc.font('Helvetica'),
      });

      // Finalize the PDF and get the output
      const pdfContent = await doc.end();

      const filename = `${snap.id}_${new Date().toISOString()}.pdf`;

      const attachment = {
        data: pdfContent,
        filename: filename,
        contentType: 'application/pdf',
      };

      const data = {
        from: `noreply@inspection-6c319.web.app/`,
        to: `${process.env.EMAIL_ADMIN}`,
        subject: 'Inspection Report',
        attachment: [attachment],
      };

      await mg.messages().send(data, (error, body) => {
        if (error) {
          console.log(`Error trying to send email: `, error.message);
          throw new Error(error.message);
        }
        return console.log(`Email sent successfully `, body);
      });
    } catch (error) {
      console.log(error.message);
    }
  });
