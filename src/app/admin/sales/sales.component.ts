import { Component, forwardRef, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Plan } from "../models/plan.model";
import { GeneralServiceService } from "../services/general-service.service";
import { Sales } from "../models/sales";
import { Sale } from "../models/sale.model";
import { Service } from "../models/service.model";
import { Router } from '@angular/router';

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.css"],
})
export class SalesComponent implements OnInit {
  public _formEntity: FormGroup;
  public data: Array<Sales>;
  public services: any;
  public edit: boolean;

  detailSale: Array<Service> = [];
  plan: any = [];
  showdeatil: boolean;

  dateToday: any;

  date: any;
  user: any;

  AllSales: any;
  totalFilter: any;

  sellers: any;
  sellerSelected: any;

  totalVenta: any;
  totalVentaHistorico: any;
  constructor(public router: Router, private _GeneralServiceService: GeneralServiceService) {
    this.showdeatil = false;
    this.AllSales = [];
    this.sellers = [];
  }

  ngOnInit() {
    if(localStorage.getItem('sellerSelected') || localStorage.getItem('sellerSelected') === ''){
      document.getElementById("btnmodal").click();
    }

    this.initForm();
    let f = new Date();
    let mes;

    if (f.getMonth() + 1 < 10) {
      mes = "0" + (f.getMonth() + 1);
    } else {
      mes = f.getMonth() + 1;
    }

    this.dateToday = f.getFullYear() + "-" + mes + "-" + f.getDate();
    console.log("Fecha de hoy", this.dateToday);
    this.getseller();
    // this.getData();
    this.getAllSales();
    // this.calcVentaTotal();
    this.getDataServices();
    this.getSellers();
  }
  initForm() {
    this._formEntity = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      datef: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }

  showDeatil(data) {
    this.showdeatil = true;

    this.detailSale = data.detail;
    this.plan = data.plans;
  }

  getData() {
    this._GeneralServiceService
      .getSalesBydate("sales", this.dateToday)
      .subscribe((data) => {
        // console.log('dara', data);
        this.data = data.map((e) => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Sales;
        });
      });
  }
  getDataServices() {
    this._GeneralServiceService.getFirebase("service").subscribe((data) => {
      // console.log('dara', data);
      this.services = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as any;
      });
      console.log("services", this.services);
    });
  }
  getDatafilter() {
    this._GeneralServiceService
      .getSalesByDateAndSeller("sales", "", "")
      .subscribe((data) => {
        // console.log('dara', data);
        this.data = data.map((e) => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Sales;
        });
      });
  }

  getseller() {
    this._GeneralServiceService.getFirebase("users").subscribe((data) => {
      // console.log('dara', data);
      this.user = data.map((e) => {
        console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as any;
      });
    });
  }

  approve(element: Sales) {
    element.state = "Aprobada";
    this._GeneralServiceService.updateFirebase("sales", element);
  }

  cancel(element: Sales) {
    element.state = "Cancelada";
    this._GeneralServiceService.updateFirebase("sales", element);
  }

  search(seller?, date?) {
    console.log("seller", seller);
    console.log("date", date);
    if (date === "") {
      date = this.dateToday;
    }
    if (seller === "Selecciona un vendedor" || seller === "") {
      seller = "Oficina";
    }
    this._GeneralServiceService
      .getSalesByDateAndSeller("sales", seller, date)
      .subscribe((data) => {
        // console.log('dara', data);
        this.data = data.map((e) => {
          // console.log("result dara", e.payload.doc.data());

          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Sales;
        });
        this.calcVenta();
      });
  }
  calcVenta() {
    let subtotalDetail, subtotalplan;
    subtotalDetail = 0;
    subtotalplan = 0;
    for (let index = 0; index < this.data.length; index++) {
      let arrydetail = this.data[index].detail;
      let arryplan = this.data[index].plans;
      for (let index2 = 0; index2 < arrydetail.length; index2++) {
        subtotalDetail = subtotalDetail + arrydetail[index2].publicvalue;
      }
      for (let index3 = 0; index3 < arryplan.length; index3++) {
        subtotalplan = subtotalplan + arryplan[index3].totalvalue;
      }
    }
    this.totalVenta = subtotalDetail + subtotalplan;
  }
  /**
   * Calcular venta total, sumando los servcios individuales
   */
  calcVentaTotal() {
    let allDataSales;
    this._GeneralServiceService.getFirebase("sales").subscribe((data) => {
      console.log("data", data);

      allDataSales = data.map((e) => {
        // console.log("result dara", e.payload.doc.data());

        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Sales;
      });
      let subtotalDetail, subtotalplan;
      subtotalDetail = 0;
      subtotalplan = 0;

      for (let index = 0; index < allDataSales.length; index++) {
        let arrydetail = allDataSales[index].detail;
        let arryplan = allDataSales[index].plans;
        for (let index2 = 0; index2 < arrydetail.length; index2++) {
          subtotalDetail = subtotalDetail + arrydetail[index2].publicvalue;
        }
        for (let index3 = 0; index3 < arryplan.length; index3++) {
          subtotalplan = subtotalplan + arryplan[index3].totalvalue;
        }
      }
      this.totalVentaHistorico = subtotalDetail + subtotalplan;
      console.log("allDataSales", allDataSales);
    });
  }
  getAllSales() {
    this._GeneralServiceService.getFirebase("sales").subscribe((data) => {
      this.AllSales = data.map((e) => {
        // console.log("getAllSales", e.payload.doc.data());

        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Sales;
      });
    });
  }
  submitFilter() {
    console.log("AllSales", this.AllSales);

    let formValue;
    formValue = this._formEntity.value;
    console.log("formValue", formValue);
    let subtotalDetail, subtotalplan;
    subtotalDetail = 0;
    subtotalplan = 0;
    let numservices = 0;
    let numservicesinPlan = 0;
    for (let index = 0; index < this.AllSales.length; index++) {
      let arrydetail = this.AllSales[index].detail;
      let arryplan = this.AllSales[index].plans;
      //Validar el filtro solicitado

      for (let index2 = 0; index2 < arrydetail.length; index2++) {
        if (arrydetail[index2].id === formValue.name) {
          numservices = numservices + 1;
          subtotalDetail = subtotalDetail + arrydetail[index2].publicvalue;
        }
      }
      for (let index3 = 0; index3 < arryplan.length; index3++) {
        for (
          let index4 = 0;
          index4 < arryplan.services[index4].length;
          index++
        ) {
          if (arryplan.services[index4].id === formValue.name) {
            numservicesinPlan = numservicesinPlan + 1;
            subtotalplan = subtotalplan + arryplan.services[index4].publicvalue;
          }
        }
      }
    }
    this.totalFilter = subtotalDetail + subtotalplan;
    console.log("allDataSales", this.totalFilter + "total# ", numservices);
  }

  getSellers() {
    this._GeneralServiceService.getSeller().subscribe((data) => {
      this.sellers = data.map((e) => {
        console.log("users", e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as any;
      });
    });
  }
  selectSeller(e) {
    this.sellerSelected = e
    console.log(e);
  }
  saveSelect(){
    localStorage.setItem('sellerSelected', this.sellerSelected)
    this.router.navigate(['admin/new-sales']);
  }
  compare(attr, obj1, obj2) {
    return obj1[attr].localeCompare(obj2[attr]);
 }
  generaComparador(attr) {
    return (a,b) => {
       return this.compare(attr,a,b);
    }
  }
  ordenar(){
    console.log(this.data.sort((a,b) => parseInt(a.codebar) -  parseInt(b.codebar)));
  }
}
