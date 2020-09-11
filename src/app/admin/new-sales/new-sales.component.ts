import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServiceService } from '../services/general-service.service';
import { Plan } from '../models/plan.model';
import { Service } from '../models/service.model';

@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrls: ['./new-sales.component.css']
})
export class NewSalesComponent implements OnInit {
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

  constructor(private _GeneralServiceService: GeneralServiceService) {
    this.receipt = false;
    this.arraySelectPlan = [];
    this.arraySelect = [];
    this.totalValue = 0;
    this.total = 0;
    this.barcodes = [];
    this.showmixprice = false;

    this.typepay = 'Efectivo';


    this.code = '';



    this._formEntity = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      seller: new FormControl('Oficina', [
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
    this.getDataPlans();
  }


  getData() {
    this._GeneralServiceService.getFirebase('service').subscribe(
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
  getDataPlans() {
    this._GeneralServiceService.getFirebase('plan').subscribe(
      data => {
        console.log('dara', data);
        this.plans = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Plan;
        });
      });
  }

  loadPlan(e) {
    console.log('ch', e);
    this.addValueToArraySelectPlan(e);

  }
  addValueToArraySelectPlan(item) {

    this._GeneralServiceService.getById('plan', item).then(
      datas => {
        console.log('datas', datas.data());
        this.psPlan(datas.data());
      }, err => {
        console.log(err);
      }
    );
  }
  psPlan(data) {
    this.total = this.total + data.totalvalue;
    this.arraySelectPlan.push(data);
    console.log(this.arraySelectPlan);
  }

  onChangeServ(deviceValue) {
    console.log(deviceValue);
    this.addValueToArraySelect(deviceValue);
  }

  addValueToArraySelect(item) {

    this._GeneralServiceService.getById('service', item).then(
      datas => {
        console.log('datas', datas.data());
        this.ps(datas.data());
      }, err => {
        console.log(err);
      }
    );
  }
  ps(data) {
    this.totalValue = this.totalValue + data.publicvalue;
    this.arraySelect.push(data);
    console.log(this.arraySelect);
  }

  removeItemFromArr(item) {

    let i;
    debugger
    i = this.arraySelect.indexOf(item);
    this.totalValue = this.totalValue - item.publicvalue;
    if (i !== -1) {
      this.arraySelect.splice(i, 1);
    }
  }

  removeItemFromArrPlan(item) {
    let i;
    debugger
    i = this.arraySelectPlan.indexOf(item);
    this.total = this.total - item.publicvalue;

    if (i !== -1) {
      this.arraySelectPlan.splice(i, 1);
    }
  }

  addCod() {
    // get code database
    let dataResulCode = this.code;
    this._GeneralServiceService.getSalesBydaCodeBar('sales', dataResulCode).subscribe(
      (data: any) => {
        let info = data.map(e => {
          console.log(e.payload.doc.data());
           return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as any;
        });
      },err =>{
        console.log(err);
      }
    )

    let find_Code_duplic;
    if (this.code === '' || this.code === null) {
      alert('Ingrese un codigo de barra');
    } else {
      find_Code_duplic = false;
      // Buscar el codigo si ya fue añadido
      this.barcodes.forEach(element => {
        if (element.code === this.code) {
          find_Code_duplic = true;
        }
      });
      if (find_Code_duplic === false) {
        this.barcodes.push({ code: this.code });

      } else {
        alert('Ya se encuentra registrado el codigo: ' + this.code + ' en esta venta registra otro nuevo.')
      }
      this.code = '';
    }

  }

  removeCode(item) {
    let i;
    i = this.barcodes.indexOf(item);

    if (i !== -1) {
      this.barcodes.splice(i, 1);
    }
  }

  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
  }

  onSubmit1() {
    let formValue;
    let body;

    let dates = new Date();
    let dateString, hour;
    dateString = dates.getFullYear() + "-" + this.appendLeadingZeroes((dates.getMonth() + 1)) + "-" + this.appendLeadingZeroes(dates.getDate());
    hour = dates.getHours() + ":" + dates.getMinutes() + ":" + dates.getSeconds();
    formValue = this._formEntity.value;

    let ventas;
    ventas = false;

    if (this.arraySelectPlan.length > 0 || this.arraySelect.length > 0) {

      if (this.barcodes.length > 0) {

        this.barcodes.forEach(element => {
          ventas = true;
          console.log('code foreac', element.code);

          if (element.code !== null) {
            let total;
            total = this.total + this.totalValue;
            formValue.codebar = '' + element.code;

            if (this.typepay === 'Mixto') {
              if (this.tarjeta > 0 && this.efecty > 0) {
                let totaltmp;
                totaltmp = this.tarjeta + this.efecty;
                if (totaltmp !== total) {
                  alert('Los valores indicados no suman el total de la factura.');
                  ventas = false;
                  return null;
                }
              } else {
                alert('Efectivo y valor en tarjeta no puedes ser menor que 0');
                ventas = false;
                return null;

              }
            }
            if (this.typepay === 'Efectivo') {
              this.tarjeta = 0;
              this.efecty = total;
            }
            if (this.typepay === 'Tarjeta') {
              this.efecty = 0;
              this.tarjeta = total;

            }

            body = {
              ...formValue,
              plans: this.arraySelectPlan,
              detail: this.arraySelect,
              date: dateString,
              hour: hour,
              total: total,
              state: 'Activo',
              efecty: this.efecty,
              tarjeta: this.tarjeta,
              typepay: this.typepay,
              zone: 'Oficina'
            };
            if (ventas) {
              this.save(body);
            }

            console.log('body', body);
          } else {
            alert('Campos obligatorios, Debe indicar un código de barra');
            return null;
          }
        });

        if (ventas) {
          alert('Venta creada. Su venta a sido registrada');
          this.receipt = true;
          let total;
          total = this.total + this.totalValue;
          this.dataFormvalue = {
            ... this._formEntity.value, codes: this.barcodes,
            plans: this.arraySelectPlan, detail: this.arraySelect, date: dateString, total: total, state: 'Activo'
          };


          this.total = 0;
          this.totalValue = 0;
          this.arraySelectPlan = [];
          this.arraySelect = [];
          this.barcodes = [];
          this._formEntity.reset();
          this.showmixprice = false;
        }

      } else {
        alert('Campos obligatorios, Debe indicar un código de barra');
        return null;
      }
    } else {
      alert('Campos obligatorios. Seleccione por lo menos un plan o un servicio a la venta');
      return null;
    }
  }

  async save(body) {
    console.log('Body', body);
    this._GeneralServiceService.createFirebase('sales', body);
  }


  /**
   * name: "asdasd"
dni: "asdas2"
seller: "Jeffer ee"
codebar: "3333333333333"
dicount: ""
service: ""
plans: Array(1)
0: {agency: "royal Cari 2", description: "asd", discount: 0, name: "PLAN TAYRONA", selectedDoor: "Ny3YhagmLOoNNdfIbfs0", …}
length: 1
__proto__: Array(0)
detail: Array(0)
length: 0
__proto__: Array(0)
date: "Mon, 30 Dec 2019 21:05:35 GMT"
total: 13000
state: "Activo"
   */

}
