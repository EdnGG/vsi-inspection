import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import base64Img from 'base64-img';

const pdfGenerator = (
  data,
  title = 'VSI Series 1000-X Incoming Inspection Form (F-850-003)',
  // imageUrl = 'https://picsum.photos/200/300',
) => {
  const NUMBER_MAX_COLUMNS = 9;

  // Cargar la imagen y convertirla a una cadena base64
  // const imgData = base64Img.base64Sync(imageUrl);

  const styles = {
    fillColor: 'gray',
    fontStyle: 'bold',
    textColor: '#ffffff',
    halign: 'center',
    fontSize: 11,
  };

  const footerStyles = {
    fillColor: '#ced4da',
    halign: 'center',
    fontSize: 9,
    textColor: 'black',
    margin: { top: 20, right: 10, bottom: 20, left: 10 },
  };

  const headerBody = [
    {
      content: 'Actuator Model',
      styles,
    },
    {
      content: 'Control Pack Serial Number',
      styles,
    },
    {
      content: 'Actuator Serial Number',
      styles,
    },
    {
      content: 'Visual',
      styles,
    },
    {
      content: 'Water Inspection',
      styles,
    },
    {
      content: 'Operational Test',
      styles,
    },
    {
      content: 'Wire Compartiment',
      styles,
    },
    {
      content: 'Bolts/Screws',
      styles,
    },
    {
      content: 'Observations',
      styles,
    },
  ];

  const footerData = [
    [
      {
        content:
          'Form Rev: A  Last Revised: 8/24/2021  Last Reviewed: 11/07/2022',
        colSpan: 9,
        styles: footerStyles,
      },
    ],
    [
      {
        content: 'DISPOSE OF BLANK FORMS AFTER 11/7/2023',
        colSpan: 9,
        styles: footerStyles,
      },
    ],
  ];

  const body = data.data.map((item) => {
    return [
      item.actuatorModel,
      item.controlPack,
      item.actuatorSerialNumber,
      item.visual,
      item.waterInspection,
      item.operationalTest,
      item.wireCompartiment,
      item.handwheelBoltPatern,
      item.observaciones,
    ];
  });

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  let previousPage = null;
  let currentPage = null;
  let isFirstPage = true;

  // AUTO TABLE *************

  autoTable(doc, {
    theme: 'grid',
    font: 'helvetica',
    cellWidth: 'wrap',
    headStyles: { fillColor: 'gray' }, // Establecer el color de fondo del encabezado aquí
    styles: { lineWidth: 0.7, lineColor: 'black' }, // establecer la propiedad lineWidth para toda la tabla aquí
    foot: footerData,
    head: [
      [
        {
          content: title,
          colSpan: 9,
          styles: {
            halign: 'center',
            fontSize: 16,
            lineWidth: 0.7,
            fontStyle: 'bold',
            lineColor: 'black',
            // fillColor: '#F2F2F2',
          },
        },
      ],

      [
        {
          content: `VSI PURCHASE ORDER NUMBER: ${data.id}`,
          colSpan: NUMBER_MAX_COLUMNS / 3,
          styles: { halign: 'left', fillColor: 'white', textColor: 'black' },
        },
        {
          content: `DATE: ${data.date}`,
          colSpan: NUMBER_MAX_COLUMNS / 3,
          styles: { halign: 'left', fillColor: 'white', textColor: 'black' },
        },
        {
          content: `INSPECTED BY: ${data.technical}`,
          colSpan: NUMBER_MAX_COLUMNS / 3,
          styles: { halign: 'left', fillColor: 'white', textColor: 'black' },
        },
      ],
      [
        {
          content: `ORDER QUANTITY: ${
            data.orderQuantity ? data.orderQuantity : ' '
          }`,
          colSpan: 5,
          styles: { halign: 'left', fillColor: 'white', textColor: 'black' },
        },
        {
          content: `TEST SAMPLE SIZE: ${
            data.testSampleSize ? data.testSampleSize : ' '
          } `,
          colSpan: 4,
          styles: { halign: 'left', fillColor: 'white', textColor: 'black' },
        },
      ],
      headerBody,
    ],

    body: [
      // headerBody,
      ...body,
      [
        {
          content: 'FINAL NOTES:',
          colSpan: 2,
          styles: {
            fillColor: 'gray',
            textColor: '#ffffff',
            fontStyle: 'bold',
            halign: 'center',
            fontWeight: 'bold',
            fontSize: 14,
            border: '4px solid black',
            lineWidth: 0.7,
            // minCellHeight: 90,
          },
        },
        { content: data.observaciones, colSpan: NUMBER_MAX_COLUMNS - 2 },
      ],
    ],
  });

  doc.save(`inspection-${data.date}.pdf`);
};

export default pdfGenerator;
