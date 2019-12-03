import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Plan} from '../models/plan.model';
import {GeneralServiceService} from '../services/general-service.service';
import {Sales} from '../models/sales';
import {Sale} from '../models/sale.model';
import {Service} from '../models/service.model';

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

  constructor(private _GeneralServiceService: GeneralServiceService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._GeneralServiceService.getFirebase('sales').subscribe(
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

  approve(element: Sales) {
    element.state = 'Aprobada';
    this._GeneralServiceService.updateFirebase('sales', element);
  }

  cancel(element: Sales) {
    element.state = 'Cancelada';
    this._GeneralServiceService.updateFirebase('sales', element);
  }

}
