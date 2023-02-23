const jsPDF = require('jspdf');
const autoTable = require('jspdf-autotable');

const pdfGenerator = async (data, title = 'VSI Incomming report') => {
  const NUMBER_MAX_COLUMNS = 9;
  const headerBody = [
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

  const body = await data.data.map((item) => {
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

  autoTable(doc, {
    theme: 'grid',
    font: 'helvetica',
    cellWidth: 'wrap',
    head: [
      [
        {
          content: title,
          colSpan: 9,
          styles: { halign: 'center', fontSize: 16 },
        },
      ],
    ],
    body: [
      [
        { content: `Number: ${data.id}`, colSpan: NUMBER_MAX_COLUMNS / 3 },
        { content: `Date: ${data.date}`, colSpan: NUMBER_MAX_COLUMNS / 3 },
        {
          content: `Technical: ${data.technical}`,
          colSpan: NUMBER_MAX_COLUMNS / 3,
        },
      ],
      headerBody,
      ...body,
      [
        {
          content: 'Final notes:',
          colSpan: 2,
          styles: {
            fillColor: 'green',
            textColor: '#ffffff',
          },
        },
        { content: data.observaciones, colSpan: NUMBER_MAX_COLUMNS - 2 },
      ],
    ],
  });

  doc.save(`inspection-${data.date}.pdf`);
};

module.exports = pdfGenerator;
