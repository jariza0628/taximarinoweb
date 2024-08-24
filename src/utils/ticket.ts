import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {GeneralSale} from '../app/admin/new-sales/new-sales.component';
import {Sales} from '../app/admin/models/sales';

export class Tickets {
  constructor() {
  }

  pdf(generalSale: GeneralSale, listSale: Array<Sales>, consecutivo?: number) {
      // Calcula el alto necesario basado en la cantidad de información
      let baseHeight = 200; // Altura base que incluye los textos iniciales
      let totalHeight = baseHeight; 

      let consecutivoPrefix = "";
      let leyendaResolucion = "";
      let leyendaResolucion2 = "";
      totalHeight = totalHeight + (listSale.length * 67);
      
  
      // Crear el documento con la altura calculada
      const doc = new jspdf({
        orientation: 'portrait',
        unit: 'mm',
        format: [250, totalHeight] // Se ajusta la altura aquí
      });
    // const doc = new jspdf({
    //   orientation: 'portrait',
    //   unit: 'mm',
    //   format: [250, 500]
    // });
  
    
    doc.setFontSize(8);
    doc.setFontType('bold');
 

    if(generalSale.zona == "ACUARIO") {
      consecutivoPrefix = "FEV " + consecutivo;
      leyendaResolucion =  "Autorización de Numeración Facturación ";
      leyendaResolucion2 = "Electrónica Numero 18764057185000";

      doc.text(12, 5, 'CENTRO DE VIDA MARINA S.A.S');
      doc.text(20, 8, 'NIT: 819005753');
      doc.text(10, 11, 'CRA 1 #7-69 Rodadero - St Marta');
    }
    if(generalSale.zona == "TAXIMARINO") {
      consecutivoPrefix = "FPO " + consecutivo;

      leyendaResolucion =  "Autorización de Numeración Facturación ";
      leyendaResolucion2 = "Electrónica Numero 18764072089414";

      doc.text(18, 5, 'TAXIMARINO S.A.S');
      doc.text(20, 8, 'NIT: 900668068');
      doc.text(10, 11, 'CRA 1 #7-69 Rodadero - St Marta');
    }
    if(generalSale.zona == "CANOPY") {
      consecutivoPrefix = "FECA " + consecutivo;

      leyendaResolucion =  "Autorización de Numeración Facturación ";
      leyendaResolucion2 = "Electrónica Numero 18764059619771";

      doc.text(14, 5, 'CANOPY PLAYA BLANCA S.A.S');
      doc.text(20, 8, 'NIT: 901001672');
      doc.text(10, 11, 'CRA 1 #7-69 Rodadero - St Marta');
    }

    doc.setFontType('normal');
    doc.text(5, 16, 'CAJERO:');
    doc.text(25, 16, '' + generalSale.sellerName);
    // doc.text(55, 15, '10:50');
    doc.text(5, 20, 'CLIENTE:');
    doc.text(25, 20, '' + generalSale.clientName);
    doc.text(5, 24, 'N° CEDULA:');
    doc.text(25, 24, '' + generalSale.clientIdentification);
    doc.text(5, 28, 'CORREO:');
    doc.text(25, 28, '' + generalSale.clientEmail);
    doc.text(5, 32, 'FECHA:');
    doc.text(25, 32, '' + generalSale.date);
    doc.text(5, 36, 'TEL:');
    doc.text(25, 36, '' + generalSale.clientNumber);
    doc.text(5, 40, 'N° FACTURA:');
    doc.text(25, 40, '' + consecutivoPrefix);

    doc.text(8, 44, '' + leyendaResolucion);
    doc.text(10, 48, '' + leyendaResolucion2);
    doc.text(5, 52, '----------------------------------------------------------------------');
    doc.setFontType('bold');
    doc.text(5, 54, 'CÓDIGO');
    doc.text(58, 54, 'DETALLE');
    doc.setFontType('normal');
    doc.text(5, 55.5, '----------------------------------------------------------------------');
    let sumrow = 62;
    listSale.forEach(sale => {

      doc.text(5, sumrow, 'Cod Barra:');
      doc.text(25, sumrow, sale.codebar);
      doc.text(60, sumrow, '' );
      sumrow += 3;
      if(sale.plans.length > 0) {
      
        sumrow += 3;
        doc.text(7, sumrow, '-----------------------------------------------------------------');
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
        
      }
    

      /** Servicios */
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
    doc.text(5, sumrow + 3, 'TOTAL NETO');
    doc.text(60, sumrow + 3, '$ ' + (generalSale.total - (generalSale.total * 0.19)).toLocaleString('es-CO'));
    doc.text(5, sumrow + 6, 'IMPUESTO');
    doc.text(60, sumrow + 6, '$ ' + (generalSale.total * 0.19).toLocaleString('es-CO'));
    doc.text(5, sumrow + 9, 'TOTAL A PAGAR');
    doc.text(60, sumrow + 9, '$ ' + generalSale.total.toLocaleString('es-CO'));
    doc.text(5, sumrow + 12, 'MEDIO DE PAGO');
    doc.text(60, sumrow + 12, '' + generalSale.paymentType);
    doc.text(10, sumrow + 17, 'GRACIAS POR SU COMPRA');
 

    const elementPrint = window.open(doc.output('bloburl'));
    elementPrint.print();
  }
}
