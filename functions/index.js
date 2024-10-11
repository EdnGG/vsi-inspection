require('dotenv').config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const sgMail = require('@sendgrid/mail');
const mailgun = require('mailgun-js');

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN_CLOUD,
});
admin.initializeApp(functions.config().firebase);
// FIREBASE FUNCTIONS
exports.sendEmail = functions.firestore
  .document('inspections/{inspectionsId}')
  .onCreate(async (snap, context) => {
    const doc = snap.data();
    console.log('doc: ', doc);

    const data = {
      from: "noreply@valvesolutions.info",
      to: `${process.env.EMAIL_ADMIN}, ${process.env.EMAIL_RECEIPE_1}, ${process.env.EMAIL_RECEIPE_4}, ${process.env.EMAIL_RECEIPE_5}, ${process.env.EMAIL_RECEIPE_6}, ${process.env.EMAIL_RECEIPE_7}, ${process.env.EMAIL_RECEIPE_11}`,      
      subject: 'Incomming Inspection Report',
      text: `Electric Actuators Inspection Report

      An Electric Actuators Inspection has been carried out with the following PO:

      PO ID: ${snap.data().inspection.id}

      Inspection Details:
      - Date: ${snap.data().inspection.date}
      - Observations: ${snap.data().inspection.observaciones}
      - Order Quantity: ${snap.data().inspection.orderQuantity}
      - Test Sample Size: ${snap.data().inspection.testSampleSize}
      - Technical Name: ${snap.data().inspection.technical}

      Visit our website for more information.`,

      html: `
      <!DOCTYPE html>
      <html
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <title>Electric Actuators Inspection</title>
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!--<![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <style type="text/css">
            #outlook a {
              padding: 0;
            }
            body {
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            table,
            td {
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
            img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
            p {
              display: block;
              margin: 13px 0;
            }
          </style>
          <!--[if mso]>
            <noscript>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG />
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            </noscript>
          <![endif]-->
          <!--[if lte mso 11]>
            <style type="text/css">
              .mj-outlook-group-fix {
                width: 100% !important;
              }
            </style>
          <![endif]-->
          <style type="text/css">
            @media only screen and (min-width: 480px) {
              .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
              }
            }
          </style>
          <style media="screen and (min-width:480px)">
            .moz-text-html .mj-column-per-100 {
              width: 100% !important;
              max-width: 100%;
            }
          </style>
          <style type="text/css">
            @media only screen and (max-width: 480px) {
              table.mj-full-width-mobile {
                width: 100% !important;
              }
              td.mj-full-width-mobile {
                width: auto !important;
              }
            }
          </style>
        </head>
        <body style="word-spacing: normal; background-color: #e7e7e7">
  
          <div style="background-color: #e7e7e7">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background: #008000; background-color: #008000; width: 100%"
            >
              <tbody>
                <tr>
                  <td>
                    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#008000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="margin: 0px auto; max-width: 600px">
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="width: 100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                direction: ltr;
                                font-size: 0px;
                                padding: 20px 0;
                                padding-bottom: 0;
                                text-align: center;
                              "
                            >
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div
                                class="mj-column-per-100 mj-outlook-group-fix"
                                style="
                                  font-size: 0px;
                                  text-align: left;
                                  direction: ltr;
                                  display: inline-block;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="vertical-align: top"
                                  width="100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          font-size: 0px;
                                          padding: 10px 25px;
                                          word-break: break-word;
                                        "
                                      >
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            border-collapse: collapse;
                                            border-spacing: 0px;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td style="width: 150px">
                                              <img 
                                              
                                                src="https://valvesolutions.com/wp-content/uploads/2024/08/Valve-Solutions-Logo_85h.png"
                                                alt="Valve Solutions Logo" height="auto"
                                                style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                width="150"
                                              >  
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          font-size: 0px;
                                          padding: 10px 25px;
                                          padding-top: 30px;
                                          word-break: break-word;
                                        "
                                      >
                                        <div
                                          style="
                                            font-family: 'Helvetica Neue', Helvetica,
                                              Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: bold;
                                            letter-spacing: 1px;
                                            line-height: 24px;
                                            text-align: center;
                                            text-transform: uppercase;
                                            color: #ffffff;
                                          "
                                        >
                                          Electric Actuators Inspection Report
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="body-section-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div
              class="body-section"
              style="
                -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
                -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
                box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
                margin: 0px auto;
                max-width: 600px;
              "
            >
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="width: 100%"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        direction: ltr;
                        font-size: 0px;
                        padding: 20px 0;
                        padding-bottom: 0;
                        padding-top: 0;
                        text-align: center;
                      "
                    >
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                      <div
                        style="
                          background: #ffffff;
                          background-color: #ffffff;
                          margin: 0px auto;
                          max-width: 600px;
                        "
                      >
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            background: #ffffff;
                            background-color: #ffffff;
                            width: 100%;
                          "
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  direction: ltr;
                                  font-size: 0px;
                                  padding: 20px 0;
                                  padding-left: 15px;
                                  padding-right: 15px;
                                  text-align: center;
                                "
                              >
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]-->
                                <div
                                  class="mj-column-per-100 mj-outlook-group-fix"
                                  style="
                                    font-size: 0px;
                                    text-align: left;
                                    direction: ltr;
                                    display: inline-block;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="vertical-align: top"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="left"
                                          style="
                                            font-size: 0px;
                                            padding: 10px 25px;
                                            word-break: break-word;
                                          "
                                        >
                                          <div
                                            style="
                                              font-family: 'Helvetica Neue', Helvetica,
                                                Arial, sans-serif;
                                              font-size: 20px;
                                              font-weight: bold;
                                              line-height: 24px;
                                              text-align: left;
                                              color: #212b35;
                                            "
                                          >
                                            An Electric Actuators Inspection has been
                                            carried out with the following PO:
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            font-size: 0px;
                                            padding: 10px 25px;
                                            word-break: break-word;
                                          "
                                        >
                                          <div
                                            style="
                                              font-family: 'Helvetica Neue', Helvetica,
                                                Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 24px;
                                              text-align: center;
                                              color: #637381;
                                            "
                                          >
                                            ${snap.data().inspection.id}
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            font-size: 0px;
                                            padding: 10px 25px;
                                            word-break: break-word;
                                          "
                                        >
                                          <div
                                            style="
                                              font-family: 'Helvetica Neue', Helvetica,
                                                Arial, sans-serif;
                                              font-size: 18px;
                                              font-weight: bold;
                                              line-height: 24px;
                                              text-align: center;
                                              color: #212b35;
                                            "
                                          >
                                            Inspection Details
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="left"
                                          style="
                                            font-size: 0px;
                                            padding: 10px 25px;
                                            word-break: break-word;
                                          "
                                        >
                                          <div
                                            style="
                                              font-family: 'Helvetica Neue', Helvetica,
                                                Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 24px;
                                              text-align: left;
                                              color: #637381;
                                            "
                                          >
                                            <ul>
                                              <li style="padding-bottom: 20px">
                                                <strong>Date:</strong>
                                                ${snap.data().inspection.date}
                                              </li>
                                              <li style="padding-bottom: 20px">
                                                <strong>Observations:</strong>
                                                ${
                                                  snap.data().inspection
                                                    .observaciones
                                                }
                                              </li>
                                              <li style="padding-bottom: 20px">
                                                <strong>Order Quantity:</strong>
                                                ${
                                                  snap.data().inspection
                                                    .orderQuantity
                                                }
                                              </li>
                                              <li style="padding-bottom: 20px">
                                                <strong>Test Sample Size:</strong>
                                                ${
                                                  snap.data().inspection
                                                    .testSampleSize
                                                }
                                              </li>
                                              <li>
                                                <strong>Technical Name:</strong>
                                                ${
                                                  snap.data().inspection
                                                    .technical
                                                }
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><![endif]-->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td>
                    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="margin: 0px auto; max-width: 600px">
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="width: 100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                direction: ltr;
                                font-size: 0px;
                                padding: 20px 0;
                                text-align: center;
                              "
                            >
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                              <div style="margin: 0px auto; max-width: 600px">
                                <table
                                  align="center"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="width: 100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          direction: ltr;
                                          font-size: 0px;
                                          padding: 20px 0;
                                          padding-top: 0;
                                          text-align: center;
                                        "
                                      >
                                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="width:600px;" ><![endif]-->
                                        <div
                                          class="mj-column-per-100 mj-outlook-group-fix"
                                          style="
                                            font-size: 0;
                                            line-height: 0;
                                            text-align: left;
                                            display: inline-block;
                                            width: 100%;
                                            direction: ltr;
                                          "
                                        >
                                          <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td style="vertical-align:top;width:600px;" ><![endif]-->
                                          <div
                                            class="mj-column-per-100 mj-outlook-group-fix"
                                            style="
                                              font-size: 0px;
                                              text-align: left;
                                              direction: ltr;
                                              display: inline-block;
                                              vertical-align: top;
                                              width: 100%;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      vertical-align: top;
                                                      padding-right: 0;
                                                    "
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      width="100%"
                                                    >
                                                      <tbody></tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <!--[if mso | IE]></td></tr></table><![endif]-->
                                        </div>
                                        <!--[if mso | IE]></td></tr></table><![endif]-->
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>

              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tr>
                  <td style="direction:ltr; font-size:0px; padding:20px 0; text-align:center;">
                    <div style="font-family: Helvetica, Arial, sans-serif; font-size:12px; line-height:1.5; text-align:center; color:#000000;">
                      
                      <br/><br/>
                      <a href="https://inspection-6c319.web.app" style="color: #008000; text-decoration: none;">GO TO WEBSITE</a>
                      <br/><br/>
                     
                      Copyright © 2024 Valve Solutions
                    </div>
                  </td>
                </tr>
              </table>

            </table>
          </div>
        </body>
      </html>
            `,
    };

    await mg.messages().send(data, (error, body) => {
      console.log('data: ', data);
      console.log('body: ', body);
      if (error) {
        return console.log(`error: `, error.message);
      }
      return console.log(`email send it `, body);
    });

    // No olvides eliminar el archivo PDF temporal
    // fs.unlinkSync(pdfPath);
  });

{
  /* <img
  alt="valve solutions logo"
  height="auto"
  src="https://valvesolutions.com/wp-content/uploads/2020/12/Valve-Solutions-Logo-1-150x72-1.png"
  style="
                                                    border: 0;
                                                    display: block;
                                                    outline: none;
                                                    text-decoration: none;
                                                    height: auto;
                                                    width: 100%;
                                                    font-size: 13px;
                                                  "
  width="150"
/>; */
}

