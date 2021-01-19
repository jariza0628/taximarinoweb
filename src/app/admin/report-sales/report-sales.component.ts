import { Component, OnInit } from "@angular/core";
import { Sales } from "../models/sales";
import { Service, GeneralReport } from "../models/service.model";
import { GeneralServiceService } from "../services/general-service.service";
import { ExcelService } from "../services/excel.service";

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.css']
})
export class ReportSalesComponent implements OnInit {
  data: Array<Sales>;

  dataFilter: any;
  dataFilter2: any;

  seletcSellers: any;
  selectService: any;

  date1: any;
  date2: any;

  total: any;
  service: any;
  sellers: any;

  generalReport: Array<GeneralReport>;
  individualService: Array<Service>;

  depAcuario: Array<any>;
  depPikua: Array<any>;
  depInkaInka: Array<any>;
  depKatamaran: Array<any>;
  depTaxiMarino: Array<any>;
  depCanopy: Array<any>;

  totalAcuario:number;
  totalPikua:number;
  totalInkaInka:number;
  totalKatamaran:number;
  totalTaxiMarino:number;
  totalCanopy:number;

  totalBank: number;
  totalefecty: number;
  totalVaoucher: number;

  btnreport: string;
  constructor(
    private _ExcelService: ExcelService,
    private _GeneralServiceService: GeneralServiceService
  ) {
    this.data = [];
    this.total = 0;
    this.generalReport = [];
    this.individualService = [];

    this.totalBank = 0;
    this.totalefecty = 0;
    this.totalVaoucher = 0;

    this.totalAcuario= 0;
    this.totalPikua= 0;
    this.totalInkaInka= 0;
    this.totalKatamaran= 0;
    this.totalTaxiMarino= 0;
    this.totalCanopy= 0;

    this.depAcuario = [];
    this.depPikua = [];
    this.depInkaInka = [];
    this.depKatamaran = [];
    this.depTaxiMarino = [];
    this.depCanopy = [];

    this.btnreport = 'Filtrar';
  }

  ngOnInit() {
    this.getServices();
    this.getSellers();
  }

  getDataByRangeDate() {
    console.log("getDataByRangeDate");

    if (this.date1 && this.date2) {
      let subscription = this._GeneralServiceService
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
          this.reportGeneral();
          this.calcValue(this.dataFilter);
        });
        setTimeout(() => {
          subscription.unsubscribe();
   
        }, 1200);
    } else {
    }
  }

  reportGeneral() {
    this.individualService = [];
    this.generalReport = [];
    this.data.forEach((sale) => {
      //Contar por departamentos
      sale.plans.forEach((plan) => {
        plan.services.forEach((element) => {
           this.individualService.push({codebar: sale.codebar, ... element});
        });
      });
      sale.detail.forEach((serviceItem) => {
        this.individualService.push({codebar: sale.codebar, ... serviceItem});
      });

      // Buscar vendedor y sumar datos
      let finReg = false;
      this.generalReport.forEach((report) => {
        if (sale.seller === report.seller) {
          finReg = true;
          if (sale.typepay === "cash") {
            report.efecty += this.calcValueSale(sale);
          }
          if (sale.typepay === "credit") {
            report.vaucher += this.calcValueSale(sale);
          }
          if (sale.typepay === "card") {
            report.bank += this.calcValueSale(sale);
          }
          if (sale.typepay === "mixted") {
            report.efecty += Number(sale.efecty);
            report.bank += Number(sale.tarjeta);
          }
        }
      });
      // Si no lo encuentra añadirlo a generalReport
      if (finReg === false) {
        let reportTemp: GeneralReport;
        if (sale.typepay === "cash") {
          reportTemp = {
            bank: 0,
            efecty: this.calcValueSale(sale),
            seller: sale.seller,
            vaucher: 0,
          };
        }
        if (sale.typepay === "credit") {
          reportTemp = {
            bank: 0,
            efecty: 0,
            seller: sale.seller,
            vaucher: this.calcValueSale(sale),
          };
        }
        if (sale.typepay === "card") {
          reportTemp = {
            bank: this.calcValueSale(sale),
            efecty: 0,
            seller: sale.seller,
            vaucher: 0,
          };
        }
        if (sale.typepay === "mixted") {
          reportTemp = {
            bank: sale.tarjeta,
            efecty: sale.efecty,
            seller: sale.seller,
            vaucher: 0,
          };
        }
        this.generalReport.push(reportTemp);
      }
    });
 
    //Sumar Totales primera tabla
    this.totalBank = 0;
    this.totalefecty = 0;
    this.totalVaoucher = 0;
     this.generalReport.forEach((element) => {
      this.totalBank += Number(element.bank);
      this.totalVaoucher += Number(element.vaucher);
      this.totalefecty = this.totalefecty + Number(element.efecty);
    });
 
    
    //Ordenar
    this.depAcuario = [];
    this.depPikua = [];
    this.depInkaInka = [];
    this.depKatamaran = [];
    this.depTaxiMarino = [];
    this.depCanopy = [];
    this.totalAcuario= 0;
    this.totalPikua= 0;
    this.totalInkaInka= 0;
    this.totalKatamaran= 0;
    this.totalTaxiMarino= 0;
    this.totalCanopy= 0;
    this.individualService.forEach((element) => {
      if(element.publicvalue > 0){
        
      }else{
         
      }
      switch (element.department) {
        case "Acuario":
          this.totalAcuario = this.totalAcuario + Number(element.publicvalue);
          this.depAcuario.push(element);
          break;
        case "Pikua":
          this.totalPikua += Number(element.publicvalue);
          this.depPikua.push(element);
          break;
        case "InkaInka":
          this.depInkaInka.push(element);
          this.totalInkaInka += Number(element.publicvalue)
          break;
        case "Katamaran":
          this.totalKatamaran += Number(element.publicvalue)
          this.depKatamaran.push(element);
          break;
        case "TaxiMarino":
          this.totalTaxiMarino += Number(element.publicvalue)
          this.depTaxiMarino.push(element);
          break;
        case "Canopy":
          this.totalCanopy += Number(element.publicvalue)
          this.depCanopy.push(element);
          break;
        default:
          break;
      }
    });
    this.depAcuario.sort(function (a, b) {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
    this.depPikua.sort(function (a, b) {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
    this.depInkaInka.sort(function (a, b) {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
    this.depKatamaran.sort(function (a, b) {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
    this.depTaxiMarino.sort(function (a, b) {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
    this.depCanopy.sort(function (a, b) {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
 
    console.log("depTaxiMarino", this.depTaxiMarino);
    console.log('totalefecty', this.totalefecty);
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
        this.total += Number(plan.totalvalue);
      });
      sale.detail.forEach((serviceItem) => {
        this.total += Number(serviceItem.publicvalue);
      });
    });
  }

  calcValueSale(data: any) {
    let total = 0;
    data.plans.forEach((plan) => {
      total += Number(plan.totalvalue);
    });
    data.detail.forEach((serviceItem) => {
      total += Number(serviceItem.publicvalue);
    });
    return total;
  }

  export() {
    this._ExcelService.exportToExcel(this.dataFilter, "General");
  }
  exportExcel(val) {
    switch (val) {
      case 'generalReport':
        this._ExcelService.exportToExcel(this.generalReport, "General");
        break;
      default:
        this._ExcelService.exportToExcel(this.generalReport, "General");
        break;
    }
  }
  reportData() {
    if(this.btnreport === 'Filtrar'){
      this.btnreport = 'Realizar otro filtro';
    }else{
      this.getDataByRangeDate();
      this.depAcuario = [];
      this.depPikua = [];
      this.depInkaInka = [];
      this.depKatamaran = [];
      this.depTaxiMarino = [];
      this.depCanopy = [];
      this.totalAcuario= 0;
      this.totalPikua= 0;
      this.totalInkaInka= 0;
      this.totalKatamaran= 0;
      this.totalTaxiMarino= 0;
      this.totalCanopy= 0;
      this.totalBank = 0;
      this.totalefecty = 0;
      this.totalVaoucher = 0;
      this.btnreport === 'Filtrar'
    }
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
    if (this.selectService && this.selectService.length > 0) {
      this.total = 0;
      this.selectService.forEach((service) => {
        this.filterforServices(service);
      });
      this.dataFilter = this.dataFilter2;
    }
    this.selectService = null;
    this.seletcSellers = null;
    console.log("Conut sales", this.dataFilter.length);
    this.data = this.dataFilter;
    this.reportGeneral();
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
  limpirResultdos() {
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