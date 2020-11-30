import { Component, OnInit } from "@angular/core";
import { Service } from "../models/service.model";
import { GeneralServiceService } from "../services/general-service.service";

@Component({
  selector: "app-reporst-general",
  templateUrl: "./reporst-general.component.html",
  styleUrls: ["./reporst-general.component.css"],
})
export class ReporstGeneralComponent implements OnInit {
  data: any;

  dataFilter: any;
  dataFilter2: any;


  seletcSellers: any;
  selectService: any;

  date1: any;
  date2: any;

  total: any;
  service: any;
  sellers: any;
  constructor(private _GeneralServiceService: GeneralServiceService) {
    this.data = [];
    this.total = 0;
  }

  ngOnInit() {
    this.getServices();
    this.getSellers();
  }

  getDataByRangeDate() {
    console.log("getDataByRangeDate");

    if (this.date1 && this.date2) {
      this._GeneralServiceService
        .getSalesByDateRange("sales", this.date1, this.date2)
        .subscribe((data) => {
          // console.log('dara', data);
          this.data = data.map((e) => {
            console.log(e.payload.doc.data());
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
            } as any;
          });
          this.dataFilter = this.data;
          this.calcValue(this.dataFilter);
        });
    } else {
    }
  }

  getServices() {
    this._GeneralServiceService.getFirebase("service").subscribe((data) => {
      // console.log('dara', data);
      this.service = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Service;
      });
      setTimeout(() => {
        this.ordenar();
      }, 1000);
    });
  }

  getSellers() {
    this._GeneralServiceService.getFirebase("users").subscribe((data) => {
      // console.log('dara', data);
      this.sellers = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as any;
      });
      setTimeout(() => {
        this.ordenar();
      }, 1000);
    });
  }

  calcValue(data: any) {
    this.total = 0;
    data.forEach((sale) => {
      sale.plans.forEach((plan) => {
        this.total += plan.totalvalue;
      });
      sale.detail.forEach((serviceItem) => {
        this.total += serviceItem.publicvalue;
      });
    });
  }
  reportData() {
    let resultData;
    resultData = [];
    console.log("selectService", this.selectService);
    console.log("selectSellers", this.seletcSellers);
    this.dataFilter = [];
    this.dataFilter2 = [];
    // filtar las ventas por vendedor
    this.seletcSellers.forEach((sellers) => {
      this.filter(sellers);
    });
    if(this.selectService.length > 0){
      this.total = 0;
      this.selectService.forEach((service) => {
        this.filterforServices(service);
      });
      this.dataFilter = this.dataFilter2;
    }
    this.selectService = null;
    this.seletcSellers = null;
    console.log("Conut sales", this.dataFilter.length);
  }

  filter(seller) {
    let results;
    results = [];
    this.data.forEach((sale) => {
      if (seller === sale.seller) {
        results.push(sale);
      }
    });
    this.dataFilter = this.dataFilter.concat(results);
    this.calcValue(this.dataFilter);
  }
  filterforServices(service) {
    let result = [];
   
    this.dataFilter.forEach((sale) => {
      let find = false;
      sale.plans.forEach((plan) => {
        plan.services.forEach((serviceItem) => {
          if (service === serviceItem.name) {
            this.total += plan.totalvalue;
            find = true;
            result.push(sale);
          }
        });
      });
      sale.detail.forEach((serviceItem) => {
        if (service === serviceItem.name) {
          if (find === false) {
            this.total += serviceItem.publicvalue;
            result.push(sale);
          }
        }
      });
    });
    this.dataFilter2 = this.dataFilter2.concat(result);
    // this.calcValue(this.dataFilter);

  }
  limpirResultdos(){
    this.dataFilter = [];
    this.data = [];
    this.total = 0;
  }

  ordenar() {
    this.service = this.service
      .filter((keyword, index) => this.service.indexOf(keyword) === index)
      .sort((a, b) => {
        if (a < b) return -1;
        else if (a > b) return 1;
        return 0;
      });
  }
}
