import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {GeneralServiceService} from '../services/general-service.service';
import {Plan} from '../models/plan.model';
import {Service} from '../models/service.model';
import {v4 as uuidv4} from 'uuid';
import {Tickets} from 'src/utils/ticket';

@Component({
  selector: "app-new-sales",
  templateUrl: "./new-sales.component.html",
  styleUrls: ["./new-sales.component.css"],
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

  sellers: any;

  generalSale: GeneralSale = {};

  ticke = new Tickets();

  constructor(private _GeneralServiceService: GeneralServiceService) {
    this.receipt = false;
    this.arraySelectPlan = [];
    this.arraySelect = [];
    this.totalValue = 0;
    this.total = 0;
    this.barcodes = [];
    this.showmixprice = false;

    this.typepay = "Efectivo";

    this.code = "";

    this._formEntity = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      seller: new FormControl("yajaira oficina", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      dni: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }

  ngOnInit() {
    this.getData();
    this.getDataPlans();
    this.getSellers();
  }

  getData() {
    this._GeneralServiceService.getFirebase("service").subscribe((data) => {
      console.log("dara", data);
      this.services = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Service;
      });
    });
  }

  getDataPlans() {
    this._GeneralServiceService.getFirebase("plan").subscribe((data) => {
      console.log("dara", data);
      this.plans = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Plan;
      });
    });
  }

  loadPlan(e) {
    console.log("ch", e);
    this.addValueToArraySelectPlan(e);
  }

  addValueToArraySelectPlan(item) {
    this._GeneralServiceService.getById("plan", item).then(
      (datas) => {
        console.log("datas", datas.data());
        this.psPlan(datas.data());
      },
      (err) => {
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
    this._GeneralServiceService.getById("service", item).then(
      (datas) => {
        console.log("datas", datas.data());
        this.ps(datas.data());
      },
      (err) => {
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
     i = this.arraySelect.indexOf(item);
    this.totalValue = this.totalValue - item.publicvalue;
    if (i !== -1) {
      this.arraySelect.splice(i, 1);
    }
  }

  removeItemFromArrPlan(item) {
    let i;
     i = this.arraySelectPlan.indexOf(item);
      
    this.total = this.total - item.totalvalue;

    if (i !== -1) {
      this.arraySelectPlan.splice(i, 1);
    }
  }
  alert(msj){
    alert('msj')
  }
  async validaeCod(val) {
    debugger
    if(!val){
      return
    }
    // get code database
    console.log("code", this.code);
    let find_Code_duplic, cod_vendido;
    let dataResulCode = this.code;

    if (this.code === "" || this.code === null) {
      alert("Ingrese un codigo de barra");
    } else {
      find_Code_duplic = false;
      
      //Validar si el cod fue vendido
      await this._GeneralServiceService
        .getSalesBydaCodeBar("sales", this.code + "")
        .subscribe(
          (data: any) => {
            debugger
            console.log("codeBAr search", data + "code:", this.code);
            if(this.code===""){
              return null
            }else{
              
            }
            let info = data.map((e) => {
              console.log(e.payload.doc.data());
              let result;
              result = e.payload.doc.data();
              if (result) {
                cod_vendido = true;
                
                  alert("El codigo "+ this.code + " ya se encuentra regisrado intente con otro");
                  this.code = "";
                
              }  
               
            });
            console.log('info', info);
            if(info.length === 0){
              this.addCodesave(dataResulCode);
            }
            
          },
          (err) => {
            console.log(err);
          }
        );

      
    }
  }

  addCodesave(code) {
    let find_Code_duplic =false;
    this.barcodes.forEach((element) => {
      if (element.code === code) {
        find_Code_duplic = true;
      }
    });
    if (find_Code_duplic === false) {
      this.barcodes.push({ code: code });
    } else {
      alert(
        "Ya se encuentra registrado el codigo: " +
          code +
          " en esta venta registra otro nuevo."
      );
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
    return n;
  }

  onSubmit1() {
    let formValue;
    let body;

    const dates = new Date();
    let dateString, hour;
    dateString =
      dates.getFullYear() +
      "-" +
      this.appendLeadingZeroes(dates.getMonth() + 1) +
      "-" +
      this.appendLeadingZeroes(dates.getDate());
    hour =
      dates.getHours() + ":" + dates.getMinutes() + ":" + dates.getSeconds();
    formValue = this._formEntity.value;

    let ventas;
    ventas = false;

    if (this.arraySelectPlan.length > 0 || this.arraySelect.length > 0) {
      if (this.barcodes.length > 0) {
        // id of sale general
        const saleIdentifier = uuidv4();
        // set object for creted general sale
        this.generalSale = {
          ...this.generalSale,
          clientName: this._formEntity.value.name,
          sellerName: this._formEntity.value.seller,
          total: (this.totalValue + this.total) * this.barcodes.length,
          idGenerated: saleIdentifier,
          date: dateString,
          clientIdentification: this._formEntity.value.dni,
        };

        /* for push in firebase*/
        this.barcodes.forEach((element) => {
          ventas = true;
          console.log("code foreac", element.code);

          if (element.code !== null) {
            let total;
            
            total = (this.totalValue + this.total) * this.barcodes.length;
            formValue.codebar = "" + element.code;

            if (this.generalSale.paymentType === "mixed") {
              if (this.generalSale.card > 0 && this.generalSale.cash > 0) {
                let totaltmp;
                totaltmp = this.generalSale.card + this.generalSale.cash;
                if (totaltmp !== total) {
                  alert(
                    "Los valores indicados no suman el total de la factura."
                  );
                  ventas = false;
                  return null;
                }
              } else {
                alert("Efectivo y valor en tarjeta no puedes ser menor que 0");
                ventas = false;
                return null;
              }
            }
            if (this.generalSale.paymentType === "cash") {
              this.generalSale.card = 0;
              this.generalSale.cash = total;
            }
            if (this.generalSale.paymentType === "card") {
              this.generalSale.cash = 0;
              this.generalSale.card = total;
            }

            body = {
              ...formValue,
              plans: this.arraySelectPlan,
              detail: this.arraySelect,
              date: dateString,
              hour: hour,
              total: total,
              state: "Activo",
              efecty: this.generalSale.cash || null,
              tarjeta: this.generalSale.card || null,
              typepay: this.generalSale.paymentType || null,
              zone: "Oficina",
              idGeneralSale: saleIdentifier,
            };
            if (ventas) {
              this.save(body);
              this.code = "";

            }

            console.log("body", body);
          } else {
            alert("Campos obligatorios, Debe indicar un código de barra");
            return null;
          }
        });

        if (ventas) {
          const sale = this._GeneralServiceService.createFirebase(
            "generalSale",
            this.generalSale
          );
          console.log(sale);
          sale.then((result) => {
            this._GeneralServiceService
              .getById("generalSale", result.id)
              .then((datas) => {
                const generalSale = datas.data();
                this._GeneralServiceService
                  .getSaleByIdGenerated(
                    "sales",
                    "idGeneralSale",
                    generalSale.idGenerated
                  )
                  .subscribe((res) => {
                    const list = res.map((data) => data.payload.doc.data());
                    console.log(list);

                    // this.ticke.pdf(generalSale, list);
                  });
              });
          });

          alert("Venta creada. Su venta a sido registrada");
          // this.receipt = true;
          let total;
          total = this.total + this.totalValue;
          this.dataFormvalue = {
            ...this._formEntity.value,
            codes: this.barcodes,
            plans: this.arraySelectPlan,
            detail: this.arraySelect,
            date: dateString,
            total: total,
            state: "Activo",
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
        alert("Campos obligatorios, Debe indicar un código de barra");
        return null;
      }
    } else {
      alert(
        "Campos obligatorios. Seleccione por lo menos un plan o un servicio a la venta"
      );
      return null;
    }
  }

  async save(body) {
    await this._GeneralServiceService
      .createFirebase("sales", body)
      .catch((error) => console.error(error));
  }

  getSellers(){
    this._GeneralServiceService.getSeller().subscribe(
      data =>{
        this.sellers = data.map((e) => {
           console.log('users', e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as any;
        });
      }
    )
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

export interface GeneralSale {
  clientName?: string;
  clientIdentification?: string;
  sellerName?: string;
  paymentType?: "card" | "credit" | "cash" | "mixed";
  card?: number;
  cash?: number;
  idGenerated?: string;
  id?: string;
  total?: number;
  date?: Date;
}

export enum paymentType {
  'card', 'credit', 'cash', 'mixed',
}
