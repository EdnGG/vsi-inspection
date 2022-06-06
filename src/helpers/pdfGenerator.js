import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const pdfGenerator = (
  headers,
  body,
  date,
  // head,
  // headContent
) => { 

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

// Encabezado de la tabla
  // autoTable(doc, {
    
  //   theme: 'grid',
  //   font: 'helvetica',
  //   cellWidth: 'wrap',
  //   head: [head],
  //   body: [headContent],
  // });

  autoTable(doc, {
    // styles: { fillColor: [255, 0, 0] },
    // columnStyles: { halign: 'center', fillColor: [0, 255, 0] } , // Cells in first column centered and green
    theme: 'grid',
    font: 'helvetica',
    cellWidth: 'wrap',
    // fontSize: '11',
    head: [headers],
    body,
  });


  doc.save(`inspection${date}.pdf`);

}

export default pdfGenerator;

