require('dotenv').config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const PDFDocument = require('pdfkit');

const fs = require('fs');
const path = require('path');
const os = require('os');

// temporal
// const pdfmake = require('pdfmake/build/pdfmake.js');
// const vfs_fonts = require('pdfmake/build/vfs_fonts.js');
// pdfmake.vfs = vfs_fonts.pdfMake.vfs;

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

    const pdfPath = path.join(os.tmpdir(), `report.pdf`);

    const pdfDoc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);

    pdfDoc.pipe(writeStream);

    pdfDoc.text('Inspection Report', { align: 'center', size: 18 });
    pdfDoc.text(JSON.stringify(doc, null, 2));

    pdfDoc.end();

    // Espera a que el documento PDF se termine de escribir en el archivo
    await new Promise((resolve) => writeStream.on('finish', resolve));
    const pdfBuffer = fs.readFileSync(pdfPath, { encoding: 'base64' });

    //  USANDO LA TABLA DE PDFMAKE

    // const docDefinition = {
    //   content: [
    //     {
    //       text: 'Inspection Report',
    //       fontSize: 18,
    //       alignment: 'center',
    //       margin: [0, 0, 0, 20],
    //     },
    //     {
    //       text: `Date: ${snap.data().inspection.date}`,
    //       fontSize: 14,
    //       margin: [0, 0, 0, 10],
    //     },
    //     {
    //       text: `Technical: ${snap.data().inspection.technical}`,
    //       fontSize: 14,
    //       margin: [0, 0, 0, 10],
    //     },
    //     {
    //       text: `Order Quantity: ${snap.data().inspection.orderQuantity}`,
    //       fontSize: 14,
    //       margin: [0, 0, 0, 10],
    //     },
    //     {
    //       text: `Test Sample Size: ${snap.data().inspection.testSampleSize}`,
    //       fontSize: 14,
    //       margin: [0, 0, 0, 20],
    //     },
    //     {
    //       table: {
    //         headerRows: 1,
    //         widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
    //         body: [
    //           [
    //             'Actuator Model',
    //             'Actuator Serial Number',
    //             'Control Pack',
    //             'Visual',
    //             'Water Inspection',
    //             'Operational Test',
    //             'Wire Compartment',
    //             'Handwheel Bolt Pattern',
    //             'Observations',
    //           ],
    //           ...snap
    //             .data()
    //             .inspection.data.map((item) => [
    //               item.actuatorModel,
    //               item.actuatorSerialNumber,
    //               item.controlPack,
    //               item.visual,
    //               item.waterInspection,
    //               item.operationalTest,
    //               item.wireCompartiment,
    //               item.handwheelBoltPatern,
    //               item.observaciones,
    //             ]),
    //         ],
    //       },
    //       margin: [0, 0, 0, 20],
    //     },
    //     { text: `Observaciones: ${snap.data().observaciones}`, fontSize: 14 },
    //   ],
    // };

    // const pdfDoc = pdfmake.createPdf(docDefinition);

    // await new Promise((resolve, reject) => {
    //   const writeStream = fs.createWriteStream(pdfPath);
    //   pdfDoc.getStream().pipe(writeStream);
    //   writeStream.on('finish', resolve);
    //   writeStream.on('error', reject);
    // });

    const data = {
      from: `noreply@inspection-6c319.web.app/`,
      // to: `${process.env.EMAIL_ADMIN}, ${process.env.EMAIL_RECEIPE_1}, ${process.env.EMAIL_RECEIPE_2}, ${process.env.EMAIL_RECEIPE_3}, ${process.env.EMAIL_RECEIPE_4}, ${process.env.EMAIL_RECEIPE_5}`,
      to: `${process.env.EMAIL_ADMIN}`,
      subject: 'Inspection Report',
      attachment: pdfBuffer,

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
          <div
            style="
              display: none;
              font-size: 1px;
              color: #ffffff;
              line-height: 1px;
              max-height: 0px;
              max-width: 0px;
              opacity: 0;
              overflow: hidden;
            "
          >
            Electric Actuators Inspection
          </div>
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
                                                  alt
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
                                                />
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
                                      <tr>
                                        <td
                                          align="center"
                                          vertical-align="middle"
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
                                              border-collapse: separate;
                                              width: 300px;
                                              line-height: 100%;
                                            "
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  align="center"
                                                  bgcolor="#008000"
                                                  role="presentation"
                                                  style="
                                                    border: none;
                                                    border-radius: 3px;
                                                    cursor: auto;
                                                    mso-padding-alt: 10px 25px;
                                                    background: #008000;
                                                  "
                                                  valign="middle"
                                                >
                                                  <a
                                                    href="https://inspection-6c319.web.app/"
                                                    style="
                                                      display: inline-block;
                                                      width: 250px;
                                                      background: #008000;
                                                      color: #ffffff;
                                                      font-family: 'Helvetica Neue',
                                                        Helvetica, Arial, sans-serif;
                                                      font-size: 17px;
                                                      font-weight: bold;
                                                      line-height: 120%;
                                                      margin: 0;
                                                      text-decoration: none;
                                                      text-transform: none;
                                                      padding: 10px 25px;
                                                      mso-padding-alt: 0px;
                                                      border-radius: 3px;
                                                    "
                                                    target="_blank"
                                                    >GO TO WEBSITE</a
                                                  >
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
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
    fs.unlinkSync(pdfPath);
  });

// CHAT GPT - 4

// require('dotenv').config();
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const fs = require('fs');
// const path = require('path');
// const os = require('os');

// const pdfmake = require('pdfmake/build/pdfmake.js');
// const vfs_fonts = require('pdfmake/build/vfs_fonts.js');
// pdfmake.vfs = vfs_fonts.pdfMake.vfs;

// const mailgun = require('mailgun-js');

// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILGUN_DOMAIN_CLOUD,
// });
// admin.initializeApp(functions.config().firebase);

// exports.sendEmail = functions.firestore
//   .document('inspections/{inspectionsId}')
//   .onCreate(async (snap, context) => {
//     const doc = snap.data();
//     console.log('contenido de snap.data(): ', doc);

//     const pdfPath = path.join(os.tmpdir(), `${doc.inspection.date}.pdf`);

//     const docDefinition = {
//       content: [
//         {
//           text: 'Inspection Report',
//           fontSize: 18,
//           alignment: 'center',
//           margin: [0, 0, 0, 20],
//         },
//         {
//           text: `Date: ${doc.inspection.date}`,
//           fontSize: 14,
//           margin: [0, 0, 0, 10],
//         },
//         {
//           text: `Technical: ${doc.inspection.technical}`,
//           fontSize: 14,
//           margin: [0, 0, 0, 10],
//         },
//         {
//           text: `Order Quantity: ${doc.inspection.orderQuantity}`,
//           fontSize: 14,
//           margin: [0, 0, 0, 10],
//         },
//         {
//           text: `Test Sample Size: ${doc.inspection.testSampleSize}`,
//           fontSize: 14,
//           margin: [0, 0, 0, 20],
//         },
//         {
//           table: {
//             headerRows: 1,
//             widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
//             body: [
//               [
//                 'Actuator Model',
//                 'Actuator Serial Number',
//                 'Control Pack',
//                 'Visual',
//                 'Water Inspection',
//                 'Operational Test',
//                 'Wire Compartment',
//                 'Handwheel Bolt Pattern',
//                 'Observations',
//               ],
//               ...doc.inspection.data.map((item) => [
//                 item.actuatorModel,
//                 item.actuatorSerialNumber,
//                 item.controlPack,
//                 item.visual,
//                 item.waterInspection,
//                 item.operationalTest,
//                 item.wireCompartiment,
//                 item.handwheelBoltPatern,
//                 item.observaciones,
//               ]),
//             ],
//           },
//           margin: [0, 0, 0, 20],
//         },
//         {
//           text: `Observaciones: ${doc.inspection.observaciones}`,
//           fontSize: 14,
//         },
//       ],
//     };

//     const pdfDoc = pdfmake.createPdf(docDefinition);

//     await new Promise((resolve, reject) => {
//       const writeStream = fs.createWriteStream(pdfPath);
//       pdfDoc.getStream().pipe(writeStream);
//       writeStream.on('finish', resolve);
//       writeStream.on('error', reject);
//     });

//     const pdfBuffer = fs.readFileSync(pdfPath);

//     const data = {
//       from: `noreply@inspection-6c319.web.app/`,
//       to: `${process.env.EMAIL_ADMIN}`,
//       subject: 'Inspection Report',
//       attachment: pdfBuffer,
//     };

//     await mg.messages().send(data, (error, body) => {
//       console.log('data: ', data);
//       console.log('body: ', body);
//       if (error) {
//         console.log(`error: `, error.message);
//       } else {
//         console.log(`email send it `, body);
//       }
//     });

//     fs.unlinkSync(pdfPath);
//   });
