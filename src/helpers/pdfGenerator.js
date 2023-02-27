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
  const headerBody = [
    {
      content: 'Actuator Model',
      styles,
    },
    {
      content: 'Actuator Serial Number',
      styles,
    },
    {
      content: 'Control Pack',
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

  const body = data.data.map((item) => {
    return [
      item.actuatorModel,
      item.actuatorSerialNumber,
      item.controlPack,
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
    // border: '4px solid black',
    head: [
      [
        {
          content: title,
          colSpan: 9,
          styles: {
            halign: 'center',
            fontSize: 16,
            lineWidth: 1,
            fontStyle: 'bold',
            lineColor: 'black',
            // fillColor: '#F2F2F2',
          },
        },
      ],
      // Agregar un objeto adicional para la imagen en el encabezado
      //  [
      //   {
      //     content: { image: imgData, width: 50, height: 50 },
      //     colSpan: 1,
      //   },
      // ],

      // [
      //   {
      //     content: headerBody,
      //     colSpan: 9,
      //     styles: {
      //       halign: 'center',
      //       fontSize: 16,
      //       lineWidth: 1,
      //       fontStyle: 'bold',
      //       lineColor: 'black',
      //       // fillColor: '#F2F2F2',
      //     },
      //   },
      // ],

      [
        {
          content: `VSI PURCHASE ORDER NUMBER: ${data.id}`,
          colSpan: NUMBER_MAX_COLUMNS / 3,
        },
        { content: `DATE: ${data.date}`, colSpan: NUMBER_MAX_COLUMNS / 3 },
        {
          content: `INSPECTED BY: ${data.technical}`,
          colSpan: NUMBER_MAX_COLUMNS / 3,
        },
      ],
      [
        {
          content: `ORDER QUANTITY: ${data.quantity ? data.quantity : ' '}`,
          colSpan: 5,
          // styles: { halign: 'left', fillColor: '#F2F2F2' },
        },
        {
          content: `TEST SAMPLE SIZE: ${
            data.testSampleSize ? data.testSampleSize : ' '
          } `,
          colSpan: 4,
          // styles: { halign: 'left', fillColor: '#F2F2F2' },
        },
      ],
    ],

    body: [
      // [
      //   {
      //     content: `VSI PURCHASE ORDER NUMBER: ${data.id}`,
      //     colSpan: NUMBER_MAX_COLUMNS / 3,
      //   },
      //   { content: `DATE: ${data.date}`, colSpan: NUMBER_MAX_COLUMNS / 3 },
      //   {
      //     content: `INSPECTED BY: ${data.technical}`,
      //     colSpan: NUMBER_MAX_COLUMNS / 3,
      //   },
      // ],
      // [
      //   {
      //     content: `ORDER QUANTITY: ${data.quantity ? data.quantity : ' '}`,
      //     colSpan: 5,
      //     styles: { halign: 'left', fillColor: '#F2F2F2' },
      //   },
      //   {
      //     content: `TEST SAMPLE SIZE: ${
      //       data.testSampleSize ? data.testSampleSize : ' '
      //     } `,
      //     colSpan: 4,
      //     styles: { halign: 'left', fillColor: '#F2F2F2' },
      //   },
      // ],
      headerBody,
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
            fontSize: 16,
            border: '4px solid black',
            lineWidth: 1,
            // fillColor: '#F2F2F2',
          },
        },
        { content: data.observaciones, colSpan: NUMBER_MAX_COLUMNS - 2 },
      ],
    ],

    headStyles: { fillColor: 'gray' }, // Establecer el color de fondo del encabezado aquí
    styles: { lineWidth: 1, lineColor: 'black' }, // establecer la propiedad lineWidth para toda la tabla aquí

    // didDrawPage: (data) => {
    //   // Obtener la página actual
    //   currentPage = doc.internal.getCurrentPageInfo().pageNumber;

    //   // Si es la primera página, no hacemos nada
    //   if (isFirstPage) {
    //     isFirstPage = false;
    //     return;
    //   }

    //   // Si se cambió de página, agregamos los encabezados y los datos de la tabla
    //   if (currentPage !== previousPage) {
    //     doc.autoTable({
    //       startY: 10, // Espacio superior para los encabezados
    //       // title: [title],
    //       head: [...title, headerBody],
    //       body: [body],
    //       headStyles: { ...styles, fillColor: 'gray' },
    //       styles: { lineWidth: 1, lineColor: 'black' },
    //       didParseCell: (data) => {
    //         // Ajustar el tamaño de las celdas para que quepan en la página
    //         if (data.row.index === 0) {
    //           data.cell.styles.fontSize = 11;
    //         }
    //       },
    //     });
    //   }

    //   // Actualizar la página anterior
    //   previousPage = currentPage;
    // },
  });

  doc.save(`inspection-${data.date}.pdf`);
};

export default pdfGenerator;
