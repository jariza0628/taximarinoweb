import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Plan} from '../models/plan.model';
import {GeneralServiceService} from '../services/general-service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  public _formEntity: FormGroup;
  public data: any;
  public edit: boolean;
  public arraySelect: any[];
  public dataServices: any;
  public dataAgency: any;

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
          } as Plan;
        });
      });
  }

}
