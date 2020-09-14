import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {GeneralServiceService} from '../../services/general-service.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Sale} from '../../models/sale.model';
import {Sales} from '../../models/sales';
import {Tickets} from '../../../../utils/ticket';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public receipt: boolean;
  public _formEntity: FormGroup;
  arraySelectPlan: any;
  arraySelect: any;
  services: any;
  plans: any;
  total: any;
  totalValue: any;
  barcodes: any;
  code: string;
  dataFormvalue: any;

  showmixprice: boolean;
  typepay: any;
  efecty: any;
  tarjeta: any;
  listCodebar;
  id: any;
  salesData: any;
  ticke = new Tickets();

  constructor(private _GeneralServiceService: GeneralServiceService, private rutaActiva: ActivatedRoute) {
    this.receipt = false;
    this.arraySelectPlan = [];
    this.arraySelect = [];
    this.totalValue = 0;
    this.total = 0;
    this.barcodes = [];
    this.showmixprice = false;


    this.id = this.rutaActiva.snapshot.params.id;

    console.log('id', this.id);


    this._formEntity = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      seller: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      dni: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),

    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._GeneralServiceService.getById('generalSale', this.id).then(
      datas => {
        this.salesData = datas.data();
        console.log('datas', this.salesData);
        this._GeneralServiceService.getSaleByIdGenerated('sales', 'idGeneralSale', this.salesData.idGenerated)
          .subscribe(res => {
            this.listCodebar = res.map(data => data.payload.doc.data());
            console.log('this.listCodebar',this.listCodebar);

          });
          
        this._formEntity = new FormGroup({
          name: new FormControl(this.salesData.clientName, [
            Validators.required,
            Validators.maxLength(100)
          ]),
          seller: new FormControl(this.salesData.sellerName, [
            Validators.required,
            Validators.maxLength(100)
          ]),
          dni: new FormControl(this.salesData.clientIdentification, [
            Validators.required,
            Validators.maxLength(100)
          ]),

        });

        this.efecty = this.salesData.efecty;
        this.tarjeta = this.salesData.tarjeta;
        this.total = this.salesData.total;
        this.arraySelectPlan = this.salesData.plans;
        this.arraySelect = this.salesData.detail;
      }, err => {
        console.log(err);
      }
    );
  }

  removeItemFromArr(item) {
    let i;
    i = this.arraySelect.indexOf(item);

    if (i !== -1) {
      this.arraySelect.splice(i, 1);
    }
    this.total = this.total - item.publicvalue;
  }

  removeItemFromArrPlan(item) {
    let i;
    i = this.arraySelectPlan.indexOf(item);

    if (i !== -1) {
      this.arraySelectPlan.splice(i, 1);
    }
    this.total = this.total - item.totalvalue;
  }


  submit() {
    let formValue;
    let body;

    formValue = this._formEntity.value;

    body = {
      ...formValue,
      id: this.id,
      codebar: this.salesData.codebar,
      plans: this.arraySelectPlan,
      detail: this.arraySelect,
      date: this.salesData.date,
      hour: this.salesData.hour,
      total: this.total,
      state: 'Activo',
      efecty: this.efecty,
      tarjeta: this.tarjeta,
      typepay: this.salesData.typepay,
      zone: 'Oficina'
    };
    console.log('body edit', body);
    this._GeneralServiceService.updateFirebase('sales', body);


  }

  print() {
    this.ticke.pdf(this.salesData, this.listCodebar);
  }

}
