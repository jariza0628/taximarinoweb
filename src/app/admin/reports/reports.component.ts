import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Sales} from '../models/sales';
import {GeneralServiceService} from '../services/general-service.service';
import {Service} from '../models/service.model';
import {paymentType} from '../new-sales/new-sales.component';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  seller: string;
  date: any;
  data: Array<Sales> = [];
  users: Array<any> = [];
  services: Array<Service> = [];
  paymentType = paymentType;
  @ViewChild('report') report: ElementRef;

  constructor(private GN: GeneralServiceService) {
  }

  ngOnInit() {
    this.getsellers();
    this.getServices();
  }

  servicesSale(sale: Sales) {
    let services = '';
    sale.plans.forEach(plan => {
      services = `${services} ${services === '' ? '' : '+'} ${plan.name}`;
    });

    sale.detail.forEach(service =>
      services = `${services} ${services === '' ? '' : '+'} ${service.name}`
    );
    return services;
  }

  /**
   * @author BJIMENEZ
   * @method filter sale by date and seller
   * */
  search() {
    if (this.seller && this.date) {
      this.GN.getSalesByDateAndSeller('sales', this.seller, this.date).subscribe(
        data => {
          // console.log('dara', data);
          this.data = data.map(e => {
            console.log('result', e.payload.doc.data());

            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Sales;
          });
        });
    }
  }

  getsellers() {
    this.GN.getFirebase('users').subscribe(
      data => {
        // console.log('dara', data);
        this.users = data.map(e => {
          console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as any;
        });
      });
  }

  getServices() {
    this.GN.getFirebase('service').subscribe(
      data => {
        console.log('dara', data);
        this.services = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Service;
        });
      });
  }

  typePayment(sale: Sales | any) {
    switch (sale.paymentType) {
      case 'card':
        return 'Tarjeta';
        break;
      case 'cash':
        return 'Efectivo';
        break;
      case 'credit':
        return 'Crédito';
        break;
      case 'mixed':
        return 'Mixto';
        break;
      default:
        return 'Efectivo';
        break;
    }
  }

  /**
   * @method return total money of sales
   * */
  get total() {
    let total = 0;
    this.data.forEach(sale => {
      sale.plans.forEach(plan => {
        plan.services.forEach(serviceItem => {
          total += serviceItem.publicvalue;
        });
      });
      sale.detail.forEach(serviceItem => {
        total += serviceItem.publicvalue;
      });
    });
    return total;
  }

  /**
   * @method return total by count service
   * */

  totalbySale(sale: Sales) {
    let total = 0;
    sale.plans.forEach(plan => {
      plan.services.forEach(serviceItem => {
        total += serviceItem.publicvalue;
      });
    });
    sale.detail.forEach(serviceItem => {
      total += serviceItem.publicvalue;
    });
    return total;
  }

  /**
   * @method return count by service
   * */

  countByService(service: Service) {
    if (this.services.length > 0) {
      let total = 0;
      this.data.forEach(sale => {
        sale.plans.forEach(plan => {
          plan.services.forEach(serviceItem => {
            total += serviceItem.name === service.name ? 1 : 0;
          });
        });
        sale.detail.forEach(serviceItem => {
          total += serviceItem.name === service.name ? 1 : 0;
        });
      });
      return total;
    } else {
      return 0;
    }
  }

  totalByTypePayment(paymentype: paymentType) {
    let total = 0;
    this.data.forEach((sale: Sales | any) => {
      const getvalue = () => {
        sale.plans.forEach(plan => {
          plan.services.forEach(serviceItem => {
            total += serviceItem.publicvalue;
          });
        });
        sale.detail.forEach(serviceItem => {
          total += serviceItem.publicvalue;
        });
      };
      if (!sale.paymentType && paymentype === paymentType.cash) {
        getvalue();
      }
      if (sale.paymentType === paymentype) {
        getvalue();
      }

    });
    return total;
  }

  get totalBracelet() {
    let total = 0;
    this.services.forEach(service => total += this.countByService(service));
    return total;
  }

  generateReport() {
    const element = this.report.nativeElement as HTMLElement;

    html2canvas(element, {height: 1000, width: 1000}).then(canvas => {
      const pdf = new jsPDF();

      pdf.addImage(canvas.toDataURL('image/png'), 'JPG', 5, 20, 200, 300);
      const blob = pdf.output('bloburl');
      const elementPrint = window.open(blob, '_blank', '', false);

      elementPrint.focus();
      elementPrint.print();
      // document.body.appendChild(canvas);

    });

  }


}

/*
*
* */
