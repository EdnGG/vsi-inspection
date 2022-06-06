import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const pdfGenerator = (headers, body, date) => { 

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });



  autoTable(doc, {
    theme: 'grid',
    font: 'helvetica',
    cellWidth: 'wrap',
    // fontSize: 11,
    head: [headers],
    body,
  });
  doc.save(`inspection${date}.pdf`);

}

export default pdfGenerator;

