const { jsPDF } = require('jspdf');
const autoTable = require('jspdf-autotable');

const pdfGenerator2 = async (data, title = 'VSI Incoming report') => {
  const NUMBER_MAX_COLUMNS = 9;
  const headerBody = [
    'Actuator Model',
    'Control Pack Serial Nmber',
    'Actuator Serial Number',
    'Visual',
    'Water Inspection',
    'Operational Test',
    'Wire Compartment',
    'Handwheel Bolt Pattern',
    'Observations',
  ];

  const body = await data.data.map((item) => {
    return [
      item.actuatorModel,
      item.controlPack,
      item.actuatorSerialNumber,
      item.visual,
      item.waterInspection,
      item.operationalTest,
      item.wireCompartment,
      item.handwheelBoltPattern,
      item.observaciones,
    ];
  });

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const tableData = [
    [
      {
        content: title,
        colSpan: 9,
        styles: { halign: 'center', fontSize: 16 },
      },
    ],
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
  ];

  const tableConfig = {
    theme: 'grid',
    fontStyle: 'helvetica',
    headerStyles: { fillColor: '#f2f2f2' },
    bodyStyles: { valign: 'top' },
    columnStyles: { 8: { cellWidth: 'auto' } },
  };

  autoTable(doc, {
    head: tableData[2],
    body: tableData.slice(3),
    startY: 50,
    styles: tableConfig,
    tableWidth: 'auto',
  });

  const pdfContent = doc.output('arraybuffer');

  return pdfContent;
};

module.exports = pdfGenerator2;
