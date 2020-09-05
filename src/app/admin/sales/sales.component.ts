import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Plan } from '../models/plan.model';
import { GeneralServiceService } from '../services/general-service.service';
import { Sales } from '../models/sales';
import { Sale } from '../models/sale.model';
import { Service } from '../models/service.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  public _formEntity: FormGroup;
  public data: Array<Sales>;
  public edit: boolean;

  detailSale: Array<Service> = [];
  plan: any = [];
  showdeatil: boolean;

  dateToday: any;

  date: any;
  user: any;

  constructor(private _GeneralServiceService: GeneralServiceService) {
    this.showdeatil = false;
  }


  ngOnInit() {
    let f = new Date();
    let mes;

    if ((f.getMonth() + 1) < 10) {
      mes = '0' + (f.getMonth() + 1);
    } else {
      mes = (f.getMonth() + 1);
    }

    this.dateToday = f.getFullYear() + '-' + mes + '-' + f.getDate();
    console.log('Fecha de hoy', this.dateToday);
    this.getData();
    this.getseller();


  }

  showDeatil(data) {
    this.showdeatil = true;

    this.detailSale = data.detail;
    this.plan = data.plans;

  }

  getData() {
    this._GeneralServiceService.getSalesBydate('sales', this.dateToday).subscribe(
      data => {
        // console.log('dara', data);
        this.data = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Sales;
        });
      });
  }
  getDatafilter() {
    this._GeneralServiceService.getSalesByDateAndSeller('sales', '', '').subscribe(
      data => {
        // console.log('dara', data);
        this.data = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Sales;
        });
      });
  }

  getseller() {
    this._GeneralServiceService.getFirebase('users').subscribe(
      data => {
        // console.log('dara', data);
        this.user = data.map(e => {
          console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as any;
        });
      });
  }

  approve(element: Sales) {
    element.state = 'Aprobada';
    this._GeneralServiceService.updateFirebase('sales', element);
  }

  cancel(element: Sales) {
    element.state = 'Cancelada';
    this._GeneralServiceService.updateFirebase('sales', element);
  }

  search(seller?, date?) {
    console.log('seller', seller);
    console.log('date', date);


    if (date = '') {
      date = this.dateToday;
    }

    if (seller = '') {
      date = 'Oficina';
    }

  
    this._GeneralServiceService.getSalesByDateAndSeller('sales', seller, date).subscribe(
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
