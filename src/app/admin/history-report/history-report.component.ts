import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Sales } from "../models/sales";
import { Service } from "../models/service.model";
import { GeneralServiceService } from "../services/general-service.service";

@Component({
  selector: "app-history-report",
  templateUrl: "./history-report.component.html",
  styleUrls: ["./history-report.component.css"],
})
export class HistoryReportComponent implements OnInit {
  public _formEntity: FormGroup;
  data: any;
  sales: any;
  result: any;
  resultPlans: any;
  totalSearch: any;
  totalSearchCombo: any;
  constructor(public _GeneralServiceService: GeneralServiceService) {
    this.result = [];
    this.resultPlans = [];
    this.sales = [];
    this.totalSearch = 0;
    this.totalSearchCombo = 0;
  }

  ngOnInit() {
    this.initiForm();
    this.getServices();
    this.getSales();
  }

  initiForm() {
    this._formEntity = new FormGroup({
      date: new FormControl(null, []),
      service: new FormControl(null, []),
    });
  }

  getServices() {
    this._GeneralServiceService.getFirebase("service").subscribe((data) => {
      // console.log('dara', data);
      this.data = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Service;
      });
    });
  }

  getSales() {
    this._GeneralServiceService.getFirebase("sales").subscribe((data) => {
      // console.log('dara', data);
      this.sales = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Sales;
      });
    });
  }
  submit() {
    let formValue;
    this.totalSearch = 0;
    this.result = [];
    formValue = this._formEntity.value;
    console.log("formValue", formValue);
    if(formValue.service.length > 0){
      formValue.service.forEach(elementFor => {
        console.log('elementFor', elementFor);
        this.sales.forEach((element) => {
          element.detail.forEach((service) => {
            if (formValue.service !== null && formValue.date !== null) {
              if (
                service.name === elementFor &&
                element.date == formValue.date
              ) {
                this.addresult(element);
                this.totalSearch = this.totalSearch + parseInt(service.publicvalue);
              }
            } else {
              if (elementFor !== null) {
                if (service.name === elementFor) {
                  this.addresult(element);
                  this.totalSearch =
                    this.totalSearch + parseInt(service.publicvalue);
                }
              }
            }
          });
    
          element.plans.forEach((planCb) => {
            planCb.services.forEach((servPlan) => {
              if (elementFor !== null && formValue.date !== null) {
                if (
                  servPlan.name === elementFor &&
                  element.date == formValue.date
                ) {
                  this.addresultPlans(element);
                  this.totalSearchCombo =
                    this.totalSearchCombo + parseInt(servPlan.publicvalue);
                }
              } else {
                if (elementFor !== null) {
                  if (servPlan.name === elementFor) {
                    this.addresultPlans(element);
                    this.totalSearchCombo =
                      this.totalSearchCombo + parseInt(servPlan.publicvalue);
                  }
                }
              }
            });
          });
        });
      });
    }
   

  }
  // añadir resultado para ostrar
  addresult(item) {
    // verificar que no este ingresado
    let serach = null;
    serach = this.result.indexOf(item);
    if (serach !== null) {
      this.result.push(item);
    }
  }

  // añadir resultado para ostrar
  addresultPlans(item) {
    // verificar que no este ingresado
    let serach = null;
    serach = this.resultPlans.indexOf(item);
    if (serach !== null) {
      this.resultPlans.push(item);
    }
  }
}
