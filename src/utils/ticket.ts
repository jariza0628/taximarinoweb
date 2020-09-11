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
    doc.text(25, 15, '' + generalSale.sellerName);
    // doc.text(55, 15, '10:50');
    doc.text(5, 20, 'CLIENTE:');
    doc.text(25, 20, '' + generalSale.clientName);
    doc.text(5, 24, 'N° CEDULA:');
    doc.text(25, 24, '' + generalSale.clientIdentification);
    doc.text(5, 30, '----------------------------------------------------------------------');
    doc.setFontType('bold');
    doc.text(5, 33, 'CÓDIGO');
    doc.text(58, 33, 'DETALLE');
    doc.setFontType('normal');
    doc.text(5, 35.5, '----------------------------------------------------------------------');
    let sumrow = 40;
    listSale.forEach(sale => {
      doc.text(5, sumrow, sale.codebar);
      doc.text(60, sumrow, '' );
      sumrow += 3;
      doc.text(7, sumrow, '-----------------------------------------------------------------');
      sumrow += 3;
      doc.text(7, sumrow, 'PLAN');
      doc.text(58, sumrow, 'VALOR');
      sumrow += 3;
      doc.setFontType('normal');
      doc.text(7, sumrow, '-----------------------------------------------------------------');
      sumrow += 3;
      sale.plans.forEach(plan => {
        doc.text(7, sumrow, `${plan.name}`);
        doc.text(58, sumrow, `${plan.totalvalue}`);
        sumrow += 3;
      });
      doc.text(7, sumrow, '-----------------------------------------------------------------');
      sumrow += 3;
      doc.text(7, sumrow, 'SERVICIO');
      doc.text(58, sumrow, 'VALOR');
      sumrow += 3;
      doc.setFontType('normal');
      doc.text(7, sumrow, '-----------------------------------------------------------------');
      sumrow += 3;
      sale.detail.forEach(service => {
        doc.text(7, sumrow, `${service.name}`);
        doc.text(58, sumrow, `${service.publicvalue}`);
        sumrow += 3;
      });
      sumrow += 1;
      doc.setFontType('bold');
      doc.text(5, sumrow, '----------------------------------------------------------------------');
      doc.setFontType('normal');
      sumrow += 4;
    });

    // doc.text(5, sumrow, '----------------------------------------------------------------------');
    doc.setFontType('bold');
    doc.text(5, sumrow + 3, 'TOTAL');
    doc.text(60, sumrow + 3, '' + generalSale.total);

    const elementPrint = window.open(doc.output('bloburl'));
    elementPrint.print();
  }
}
