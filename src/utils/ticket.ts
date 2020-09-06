import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {GeneralSale} from '../app/admin/new-sales/new-sales.component';
import {Sales} from '../app/admin/models/sales';

export class Tickets {
  constructor() {
  }

  pdf(generalSale: GeneralSale, listSale: Array<Sales>) {

    const doc = new jspdf({
      orientation: 'portrait',
      unit: 'mm',
      format: [250, 500]
    });
    doc.setFontSize(8);
    doc.setFontType('bold');
    doc.text(32, 5, 'Taximarino');
    doc.setFontType('normal');
    doc.text(5, 15, 'VENDEDOR:');
    doc.text(25, 15, generalSale.sellerName);
    // doc.text(55, 15, '10:50');
    doc.text(5, 20, 'CLIENTE:');
    doc.text(25, 20, '' + generalSale.clientName);
    doc.text(5, 24, 'N° CEDULA:');
    doc.text(25, 24, '' + generalSale.clientIdentification);
    doc.text(5, 30, '----------------------------------------------------------------------');
    doc.setFontType('bold');
    doc.text(5, 33, 'CÓDIGO');
    doc.text(60, 33, 'VALOR');
    doc.setFontType('normal');
    doc.text(5, 35.5, '----------------------------------------------------------------------');
    let sumrow = 40;
    listSale.forEach(sale => {
      doc.text(5, sumrow, sale.codebar);
      doc.text(60, sumrow, '' + generalSale.total / listSale.length);
      sumrow += 4;
    });
    doc.text(5, sumrow, '----------------------------------------------------------------------');
    doc.setFontType('bold');
    doc.text(5, sumrow + 4, 'TOTAL');
    doc.text(60, sumrow + 4, '' + generalSale.total);

    const elementPrint = window.open(doc.output('bloburl'));
    elementPrint.print();
  }
}
