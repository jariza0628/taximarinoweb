import { Component, OnInit } from "@angular/core";
import { Sales } from "../models/sales";
import { Service, GeneralReport, ServiceCopy } from "../models/service.model";
import { GeneralServiceService } from "../services/general-service.service";
import { ExcelService } from "../services/excel.service";

@Component({
  selector: "app-report-sales",
  templateUrl: "./report-sales.component.html",
  styleUrls: ["./report-sales.component.css"],
})
export class ReportSalesComponent implements OnInit {
  data: Array<Sales>;

  dataFilter: any;
  dataFilter2: any;

  copyData: any;

  seletcSellers: any;
  selectService: any;

  date1: any;
  date2: any;

  total: any;
  service: any;
  sellers: any;

  generalReport: Array<GeneralReport>;
  individualService: Array<ServiceCopy>;

  depAcuario: Array<any>;
  depPikua: Array<any>;
  depInkaInka: Array<any>;
  depKatamaran: Array<any>;
  depTaxiMarino: Array<any>;
  depCanopy: Array<any>;

  totalAcuario: number;
  totalPikua: number;
  totalInkaInka: number;
  totalKatamaran: number;
  totalTaxiMarino: number;
  totalCanopy: number;

  totalBank: number;
  totalefecty: number;
  totalVaoucher: number;

  btnreport: string;

  subscription1: any;

  useremail: string;
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

    this.totalAcuario = 0;
    this.totalPikua = 0;
    this.totalInkaInka = 0;
    this.totalKatamaran = 0;
    this.totalTaxiMarino = 0;
    this.totalCanopy = 0;

    this.depAcuario = [];
    this.depPikua = [];
    this.depInkaInka = [];
    this.depKatamaran = [];
    this.depTaxiMarino = [];
    this.depCanopy = [];

    this.btnreport = "Filtrar";
  }

  ngOnInit() {
    this.getServices();
    this.getSellers();
    this.useremail = localStorage.getItem("userlog");
  }

  getDataByRangeDate() {
    console.log("getDataByRangeDate");

    if (this.date1 && this.date2) {
      this.subscription1 = this._GeneralServiceService
        .getSalesByDateRange("sales", this.date1, this.date2)
        .subscribe((data) => {
          console.log("dara", data);
          this.data = data.map((e) => {
            console.log(e.payload.doc.data());
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
            } as any;
          });
          this.dataFilter = this.data;
          this.copyData = this.data;
          this.reportGeneral();
          this.calcValue(this.dataFilter);
        });
    } else {
    }
  }

  reportGeneral() {
    this.individualService = [];
    this.generalReport = [];
    this.data.forEach((sale) => {
      //Contar por departamentos
      switch (this.useremail) {
        case "taximarino2020@gmail.com":
          if (
            sale.seller === "taquillaAcuario" ||
            sale.seller === "LUIS CANOPY" ||
            sale.seller === "Andres de la hoz "
          ) {
            console.log("Excluye", sale.seller);
          } else {
            sale.plans.forEach((plan) => {
              plan.services.forEach((element) => {
                this.individualService.push({
                  codebar: sale.codebar,
                  nameClient: sale.name,
                  vaucher: sale.vaucher,
                  seller: sale.seller,
                  date: sale.date,
                  ...element,
                });
              });
            });
            sale.detail.forEach((serviceItem) => {
              this.individualService.push({
                codebar: sale.codebar,
                nameClient: sale.name,
                vaucher: sale.vaucher,
                seller: sale.seller,
                date: sale.date,
                ...serviceItem,
              });
            });
          }
          break;
        case "canopysistema2020@gmail.com":
          if (sale.seller === "taquillaAcuario") {
            console.log("Excluye", sale.seller);
          } else {
            sale.plans.forEach((plan) => {
              plan.services.forEach((element) => {
                if (element.department === "Canopy") {
                  this.individualService.push({
                    codebar: sale.codebar,
                    nameClient: sale.name,
                    vaucher: sale.vaucher,
                    seller: sale.seller,
                    date: sale.date,
                    ...element,
                  });
                }
              });
            });
            sale.detail.forEach((serviceItem) => {
              if (serviceItem.department === "Canopy") {
                this.individualService.push({
                  codebar: sale.codebar,
                  nameClient: sale.name,
                  vaucher: sale.vaucher,
                  seller: sale.seller,
                  date: sale.date,
                  ...serviceItem,
                });
              }
            });
          }
          break;
        case "acuariosistema2020@gmail.com":
          if (
            sale.seller === "LUIS CANOPY" ||
            sale.seller === "Andres de la hoz "
          ) {
            console.log("Excluye", sale.seller);
          } else {
            sale.plans.forEach((plan) => {
              plan.services.forEach((element) => {
                this.individualService.push({
                  codebar: sale.codebar,
                  nameClient: sale.name,
                  vaucher: sale.vaucher,
                  seller: sale.seller,
                  date: sale.date,
                  ...element,
                });
              });
            });
            sale.detail.forEach((serviceItem) => {
              this.individualService.push({
                codebar: sale.codebar,
                nameClient: sale.name,
                vaucher: sale.vaucher,
                seller: sale.seller,
                date: sale.date,
                ...serviceItem,
              });
            });
          }
          break;
        case "jefferariza@outlook.com":
          sale.plans.forEach((plan) => {
            plan.services.forEach((element) => {
              this.individualService.push({
                codebar: sale.codebar,
                nameClient: sale.name,
                vaucher: sale.vaucher,
                seller: sale.seller,
                date: sale.date,
                ...element,
              });
            });
          });
          sale.detail.forEach((serviceItem) => {
            this.individualService.push({
              codebar: sale.codebar,
              nameClient: sale.name,
              vaucher: sale.vaucher,
              seller: sale.seller,
              date: sale.date,
              ...serviceItem,
            });
          });
          break;
        default:
          break;
      }
      // SW Para la suma de Reporte general de vevndedor
      switch (this.useremail) {
        case "taximarino2020@gmail.com":
          if (
            sale.seller === "taquillaAcuario" ||
            sale.seller === "LUIS CANOPY" ||
            sale.seller === "Andres de la hoz "
          ) {
            console.log("Excluye", sale.seller);
          } else {
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
          }
          break;
        case "canopysistema2020@gmail.com":
          if (sale.seller === "taquillaAcuario") {
            console.log("Excluye", sale.seller);
          } else {
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
          }
          break;
        case "acuariosistema2020@gmail.com":
          if (
            sale.seller === "LUIS CANOPY" ||
            sale.seller === "Andres de la hoz "
          ) {
            console.log("excluye");
          } else {
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
          }
          break;
        case "jefferariza@outlook.com":
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
          break;

        default:
          break;
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
    this.totalAcuario = 0;
    this.totalPikua = 0;
    this.totalInkaInka = 0;
    this.totalKatamaran = 0;
    this.totalTaxiMarino = 0;
    this.totalCanopy = 0;
    this.individualService.forEach((element) => {
      if (element.publicvalue > 0) {
      } else {
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
          this.totalInkaInka += Number(element.publicvalue);
          break;
        case "Katamaran":
          this.totalKatamaran += Number(element.publicvalue);
          this.depKatamaran.push(element);
          break;
        case "TaxiMarino":
          this.totalTaxiMarino += Number(element.publicvalue);
          this.depTaxiMarino.push(element);
          break;
        case "Canopy":
          this.totalCanopy += Number(element.publicvalue);
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
    console.log("totalefecty", this.totalefecty);
    setTimeout(() => {
      this.subscription1.unsubscribe();
    }, 6000);
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
    switch (this.useremail) {
      case "canopysistema2020@gmail.com":
        data.plans.forEach((plan) => {
          plan.services.forEach((serviceItem) => {
            if (serviceItem.department === "Canopy") {
              total += Number(serviceItem.publicvalue);
            }
          });
        });
        data.detail.forEach((serviceItem: ServiceCopy) => {
          if (serviceItem.department === "Canopy") {
            total += Number(serviceItem.publicvalue);
          }
        });
        break;
      case "taximarino2020@gmail.com":
        data.plans.forEach((plan) => {
          plan.services.forEach((serviceItem) => {
            if (serviceItem.department === "TaxiMarino") {
              total += Number(serviceItem.publicvalue);
            }
          });
        });
        data.detail.forEach((serviceItem: ServiceCopy) => {
          if (serviceItem.department === "TaxiMarino") {
            total += Number(serviceItem.publicvalue);
          }
        });
        break;
      case "acuariosistema2020@gmail.com":
        data.plans.forEach((plan) => {
          plan.services.forEach((serviceItem) => {
            if (serviceItem.department === "Acuario") {
              total += Number(serviceItem.publicvalue);
            }
          });
        });
        data.detail.forEach((serviceItem: ServiceCopy) => {
          if (serviceItem.department === "Acuario") {
            total += Number(serviceItem.publicvalue);
          }
        });
        break;
      case "jefferariza@outlook.com":
        data.plans.forEach((plan) => {
          plan.services.forEach((serviceItem) => {
            total += Number(serviceItem.publicvalue);
          });
        });
        data.detail.forEach((serviceItem: ServiceCopy) => {
          total += Number(serviceItem.publicvalue);
        });
        break;
      default:
        break;
    }

    return total;
  }

  export() {
    this._ExcelService.exportToExcel(this.dataFilter, "General");
  }
  exportExcel(val) {
    switch (val) {
      case "totalreport":
        let totalreport = [];
        this.data.forEach((element) => {
          let services = '';
          let total = 0;

          element.detail.forEach(ser => {
            services = services + ' ' +ser.name;
            total = total + ser.publicvalue
          });

          element.plans.forEach(plans => {
            services = services + 'Combo: ' +plans.name;
            plans.services.forEach(ser => {
              total = total + ser.publicvalue
            });
          });
           
           
          totalreport.push({
            codigo: element.codebar,
            cliente: element.name,
            servicios: services,
            vendedor: element.seller,
            precio: total,
            voucher: element.vaucher,
            date: element.date,
            tipopago: this.chagenTypePay(element.typepay),

          });
        });
        totalreport.sort(function (a, b) {
          return a.codigo.toLowerCase().localeCompare(b.codigo.toLowerCase());
        });
        this._ExcelService.exportToExcel(totalreport, "GeneralTotal");
        break;
      case "generalReport":
        this._ExcelService.exportToExcel(this.generalReport, "General");
        break;
      case "depTaxiMarino":
        let arraydepTaxiMarino = [];
        this.depTaxiMarino.forEach((element) => {
         
          arraydepTaxiMarino.push({
            codigo: element.codebar,
            servicio: element.name,
            cliente: element.nameClient,
            vendedor: element.seller,
            precio: element.publicvalue,
            estado: element.status,
            voucher: element.vaucher,
            date: element.date,
            tipopago: this.chagenTypePay(element.typepay),
          });
        });
        this._ExcelService.exportToExcel(arraydepTaxiMarino, "TaxiMarino");
        break;
      case "depAcuario":
        let arraydepAcuario = [];
        this.depAcuario.forEach((element) => {
          arraydepAcuario.push({
            codigo: element.codebar,
            servicio: element.name,
            cliente: element.nameClient,
            vendedor: element.seller,
            precio: element.publicvalue,
            estado: element.status,
            voucher: element.vaucher,
            date: element.date,
            tipopago: this.chagenTypePay(element.typepay),
          });
        });
        this._ExcelService.exportToExcel(arraydepAcuario, "Acuario");
        break;
      case "depPikua":
        let arraydepPikua = [];
        this.depPikua.forEach((element) => {
          arraydepPikua.push({
            codigo: element.codebar,
            servicio: element.name,
            cliente: element.nameClient,
            vendedor: element.seller,
            precio: element.publicvalue,
            estado: element.status,
            voucher: element.vaucher,
            date: element.date,
            tipopago: this.chagenTypePay(element.typepay),
          });
        });
        this._ExcelService.exportToExcel(arraydepPikua, "Pikua");
        break;
      case "depInkaInka":
        let arraydepInkaInka = [];
        this.depInkaInka.forEach((element) => {
          arraydepInkaInka.push({
            codigo: element.codebar,
            servicio: element.name,
            cliente: element.nameClient,
            vendedor: element.seller,
            precio: element.publicvalue,
            estado: element.status,
            voucher: element.vaucher,
            date: element.date,
            tipopago: this.chagenTypePay(element.typepay),
          });
        });
        this._ExcelService.exportToExcel(arraydepInkaInka, "InkaInka");
        break;
      case "depKatamaran":
        let arraydepKatamaran = [];
        this.depKatamaran.forEach((element) => {
          arraydepKatamaran.push({
            codigo: element.codebar,
            servicio: element.name,
            cliente: element.nameClient,
            vendedor: element.seller,
            precio: element.publicvalue,
            estado: element.status,
            voucher: element.vaucher,
            date: element.date,
            tipopago: this.chagenTypePay(element.typepay),
          });
        });
        this._ExcelService.exportToExcel(arraydepKatamaran, "Katamaran");
        break;
      case "depCanopy":
        let arraydepdepCanopy = [];
        this.depCanopy.forEach((element) => {
          arraydepdepCanopy.push({
            codigo: element.codebar,
            servicio: element.name,
            cliente: element.nameClient,
            vendedor: element.seller,
            precio: element.publicvalue,
            estado: element.status,
            voucher: element.vaucher,
            date: element.date,
            tipopago: this.chagenTypePay(element.typepay),
          });
        });
        this._ExcelService.exportToExcel(arraydepdepCanopy, "Canopy");
        break;
      case "AllServices":
        let array = [];
        this.individualService.forEach((element) => {
          array.push({
            codigo: element.codebar,
            servicio: element.name,
            cliente: element.nameClient,
            vendedor: element.seller,
            precio: element.publicvalue,
            estado: element.status,
            voucher: element.vaucher,
            date: element.date,
            tipopago: this.chagenTypePay(element.typepay),
          });
        });
        this._ExcelService.exportToExcel(
          array,
          "Todos los servicios-" + this.date1
        );
        break;
      default:
        this._ExcelService.exportToExcel(this.generalReport, "General");
        break;
    }
  }
  reportData() {
    if (this.btnreport === "Filtrar") {
      this.btnreport = "Realizar otro filtro";
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
    } else {
      this.btnreport = "Filtrar";
      this.generalReport = [];
      this.depAcuario = [];
      this.depPikua = [];
      this.depInkaInka = [];
      this.depKatamaran = [];
      this.depTaxiMarino = [];
      this.depCanopy = [];
      this.totalAcuario = 0;
      this.totalPikua = 0;
      this.totalInkaInka = 0;
      this.totalKatamaran = 0;
      this.totalTaxiMarino = 0;
      this.totalCanopy = 0;
      this.totalBank = 0;
      this.totalefecty = 0;
      this.totalVaoucher = 0;
      this.total = 0;
      this.data = this.copyData;
      this.reportGeneral();
    }
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
  chagenTypePay(data){
    if(data==='card'){
      return 'Tarjeta'
    }
    if(data==='credit'){
      return 'Credito'
    }
    if(data==='cash'){
      return 'Efectivo'
    }
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
