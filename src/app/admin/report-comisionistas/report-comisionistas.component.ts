import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Sales } from "../models/sales";
import { GeneralServiceService } from "../services/general-service.service";
import { Service } from "../models/service.model";
import { paymentType } from "../new-sales/new-sales.component";
import html2canvas from "html2canvas";
import * as jsPDF from "jspdf";
import { ExcelService } from 'src/app/admin/services/excel.service';

@Component({
  selector: 'app-report-comisionistas',
  templateUrl: './report-comisionistas.component.html',
  styleUrls: ['./report-comisionistas.component.css']
})
export class ReportComisionistasComponent implements OnInit {

    seller: string;
    date: any;
    data: Array<Sales> = [];
    users: Array<any> = [];
    services: Array<Service> = [];
    servicesNovauche: Array<Service> = [];
    paymentType = paymentType;
    totalVauches: number;
    totalNoVauches: any;
    @ViewChild("report", { static: true }) report: ElementRef;
  
    constructor(
      private GN: GeneralServiceService,
      private _ExcelService: ExcelService
      ) {}
  
    ngOnInit() {
      this.getsellers();
      this.getServices();
      this.totalNoVauches = 0;
    }
  
    servicesSale(sale: Sales) {
      let services = "";
      sale.plans.forEach((plan) => {
        services = `${services} ${services === "" ? "" : "+"} ${plan.name}`;
      });
  
      sale.detail.forEach(
        (service) =>
          (services = `${services} ${services === "" ? "" : "+"} ${service.name}`)
      );
      return services;
    }
  
    /**
     * @author BJIMENEZ
     * @method filter sale by date and seller
     * */
    search() {
      this.totalNoVauches = 0;
      if (this.seller && this.date) {
        let subscription = this.GN.getSalesByDateAndComision(
          "sales",
          this.seller,
          this.date
        ).subscribe((data) => {
          // console.log('dara', data);
          this.data = data.map((e) => {
            console.log("result", e.payload.doc.data());
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
            } as Sales;
            
          });
        });
        setTimeout(() => {
          subscription.unsubscribe();
          this.ordenar();
  
        }, 1800);
      }
    }
  
    getsellers() {
      this.GN.getFirebase("commissions").subscribe((data) => {
        // console.log('dara', data);
        this.users = data.map((e) => {
          console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as any;
        });
      });
    }
  
    getServices() {
      this.GN.getFirebase("service").subscribe((data) => {
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
  
    typePayment(sale: Sales | any) {
      switch (sale.typepay) {
        case "card":
          return "Tarjeta";
          break;
        case "cash":
          return "Efectivo";
          break;
        case "credit":
          return "Crédito";
          break;
        case "mixed":
          return "Mixto";
          break;
        default:
          return "Efectivo";
          break;
      }
    }
  
    /**
     * @method return total money of sales
     * */
    get total() {
      let total = 0;
      if(this.data.length > 0){
        this.data.forEach((sale) => {
          sale.plans.forEach((plan) => {
            console.log('plans', plan);
            
            plan.services.forEach(element => {
              if(element.comision_value){
                total += Number(element.comision_value);
  
              }
            });
            /*
            plan.services.forEach(serviceItem => {
              total += serviceItem.publicvalue;
            });*/
          });
          sale.detail.forEach((serviceItem) => {
            if(serviceItem.comision_value){
              total += Number(serviceItem.comision_value);

            }
          });
        });
        return total;
      }else{
        return total;
      }
      
    }
  
    /**
     * @method return total by count service
     * */
  
    totalbySale(sale: Sales) {
      let total = 0;
      sale.plans.forEach((plan) => {
        total += Number(plan.totalvalue);
  
        /*plan.services.forEach(serviceItem => {
          total += serviceItem.publicvalue;
        });*/
      });
      sale.detail.forEach((serviceItem) => {
        total += Number(serviceItem.publicvalue);
      });
      return total;
    }
  
    /**
     * @method return count by service
     * */
  
    countByService(service: Service) {
      if (this.services.length > 0) {
        let total = 0;
        this.data.forEach((sale) => {
          sale.plans.forEach((plan) => {
            plan.services.forEach((serviceItem) => {
              total += serviceItem.name === service.name ? 1 : 0;
            });
          });
          sale.detail.forEach((serviceItem) => {
            total += serviceItem.name === service.name ? 1 : 0;
          });
        });
        return total;
      } else {
        return 0;
      }
    }
    /**
     * Contrar servicios sin vauches
     * @param service 
     */
    countByServiceNoVaucher(service: Service) {
      if (this.services.length > 0) {
        let total = 0;
        console.log('countByServiceNoVaucher data', this.data);    
        this.data.forEach((sale) => {
          if(sale.vaucher > 0){
            sale.plans.forEach((plan) => {
              plan.services.forEach((serviceItem) => {
                total += serviceItem.name === service.name ? 1 : 0;
                // this.totalNoVauches = this.totalNoVauches + serviceItem.publicvalue;
              });
            });
            sale.detail.forEach((serviceItem) => {
              total += serviceItem.name === service.name ? 1 : 0;
              // this.totalNoVauches = this.totalNoVauches +  serviceItem.publicvalue;
            });
          }
        });
        return total;
      } else {
        return 0;
      }
    }
  
    totalByTypePayment(paymentype: paymentType) {
      let total = 0;
      this.data.forEach((sale: Sales | any) => {
        const getvalue = () => {
          sale.plans.forEach((plan) => {
            total += Number(plan.totalvalue);
  
            /*
            plan.services.forEach(serviceItem => {
              total += serviceItem.publicvalue;
            });*/
          });
          sale.detail.forEach((serviceItem) => {
            total += Number(serviceItem.publicvalue);
          });
        };
        if (!sale.typepay && paymentype === paymentType.cash) {
          getvalue();
        }
        if (sale.typepay &&  paymentype === paymentType.card) {
          getvalue();
        }
        
      });
      return total;
    }
  
    get totalBracelet() {
      let total = 0;
      this.services.forEach((service) => (total += this.countByService(service)));
      this.totalVauchess();
      return total;
    }
    totalVauchess() {
      this.totalVauches = 0;
      this.data.forEach((sale) => {
        if (sale.vaucher) {
          sale.plans.forEach((plan) => {
            this.totalVauches += Number(plan.totalvalue);
            /*
            plan.services.forEach(serviceItem => {
              total += serviceItem.publicvalue;
            });*/
          });
          sale.detail.forEach((serviceItem) => {
            this.totalVauches += Number(serviceItem.publicvalue);
          });
        }
      });
      return this.totalVauches;
    }
    calcTypePay(typepay) {
      let total = 0;
      this.data.forEach((sale) => {
        if (sale.typepay === typepay) {
          sale.plans.forEach((plan) => {
            total += Number(plan.totalvalue);
            /*
            plan.services.forEach(serviceItem => {
              total += serviceItem.publicvalue;
            });*/
          });
          sale.detail.forEach((serviceItem) => {
            total += Number(serviceItem.publicvalue);
          });
        }
      });
      return total;
    }
    calcMixed(tarjeta) {
      let total = 0;
      let totalMixed = 0;
      this.data.forEach((sale) => {
        if (sale.typepay === 'mixed') {
          if(tarjeta==='tarjeta'){
            totalMixed = totalMixed + sale.tarjeta;
          }
          if(tarjeta==='efectivo'){
            totalMixed = totalMixed + sale.efecty;
          }
          sale.plans.forEach((plan) => {
            total += plan.totalvalue;
            /*
            plan.services.forEach(serviceItem => {
              total += serviceItem.publicvalue;
            });*/
          });
          sale.detail.forEach((serviceItem) => {
            total += Number(serviceItem.publicvalue);
          });
        }
      });
      return totalMixed;
    }
    calcDepartament(dept) {
      let totalDep = 0;
      this.data.forEach((sale) => {
        sale.plans.forEach((plan) => {
          // totalDep += plan.totalvalue;
          plan.services.forEach((serviceItem) => {
            if (dept === serviceItem.department) {
              totalDep += Number(serviceItem.publicvalue);
            }
          });
        });
        sale.detail.forEach((serviceItem) => {
          if (dept === serviceItem.department) {
            totalDep += Number(serviceItem.publicvalue);
          }
        });
      });
      console.log("calcDepartament" + dept + ": ", totalDep);
  
      return totalDep;
    }
    calcDepartamentCant(dept) {
      let totalDep = 0;
      this.data.forEach((sale) => {
        sale.plans.forEach((plan) => {
          // totalDep += plan.totalvalue;
          plan.services.forEach((serviceItem) => {
            if (dept === serviceItem.department) {
              totalDep += 1;
            }
          });
        });
        sale.detail.forEach((serviceItem) => {
          if (dept === serviceItem.department) {
            totalDep += 1;
          }
        });
      });
      console.log("calcDepartament" + dept + ": ", totalDep);
  
      return totalDep;
    }
  
    generateReport() {
      // const element = this.report.nativeElement as HTMLElement;
      //
      //
      // html2canvas(element, {height: 1000, width: 1000}).then(canvas => {
      //   const pdf = new jsPDF();
      //
      //   pdf.addImage(canvas.toDataURL('image/png'), 'JPG', 5, 20, 200, 300);
      //   const blob = pdf.output('bloburl');
      //   const elementPrint = window.open(blob, '_blank', '', false);
      //
      //   elementPrint.focus();
      //   elementPrint.print();
      //   // document.body.appendChild(canvas);
      //
      // });
      const menu = document.getElementById("menu-lateral");
      menu.style.display = "none";
      window.print();
      menu.style.display = "block";
    }
    ordenar() {
      console.log(
        this.data.sort((a, b) => parseInt(a.codebar) - parseInt(b.codebar))
      );
    }
    generateReportExcel(){
      let JSON:any;
      JSON = [];
      debugger
      this.data.forEach(element => {
        JSON.push({service: this.servicesSale(element), ... element})
      });
      this._ExcelService.exportToExcel(JSON, 'report');
    }
  }