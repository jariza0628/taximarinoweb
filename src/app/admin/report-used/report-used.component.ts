import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { element } from "protractor";
import { Agency } from "../models/agency.model";
import { Sales } from "../models/sales";
import { GeneralServiceService } from "../services/general-service.service";

@Component({
  selector: "app-report-used",
  templateUrl: "./report-used.component.html",
  styleUrls: ["./report-used.component.css"],
})
export class ReportUsedComponent implements OnInit {
  public _formEntity: FormGroup;
  result: Array<Sales>;
  dateString: string;
  agency: any;
  constructor(public _GeneralServiceService: GeneralServiceService) {
    this.result = [];
  }

  ngOnInit() {
    this.getCurrentDate();
    this.initiForm();
    this.getAgencies();
  }

  initiForm() {
    this._formEntity = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      date2: new FormControl(null, [Validators.required]),
      client: new FormControl(null),
    });
  }

  submit() {
    let formValue;
    formValue = this._formEntity.value;
    if (this._formEntity.valid) {
      console.log("formValue", formValue);
      this.getDataBydate(formValue.date, formValue.date2, formValue.client);
    }
  }

  getAgencies() {
    this._GeneralServiceService.getFirebase("agency").subscribe((data) => {
      this.agency = data.map((e) => {
        console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Agency;
      });
    });
  }

  filter() {
    let formValue = this._formEntity.value;
    let newResulSales: Array<any>;
    newResulSales = [];
    this.result.forEach((element) => {
      let serviceUsed: number = 0;
      let serviceActived: number = 0;
      if (element.detail.length > 0) {
        element.detail.forEach((service) => {
          if (service.status === "Usado") {
            serviceUsed += 1;
          }
          if (service.status === "Activo") {
            serviceActived += 1;
          }
        });
        element.plans.forEach((plans) => {
          plans.services.forEach((service) => {
            if (service.status === "Usado") {
              serviceUsed += 1;
            }
            if (service.status === "Activo") {
              serviceActived += 1;
            }
          });
        });
      }
      if (formValue.client !== "" && formValue.client !==  'Seleccionar' && formValue.client !== null) {
        if (element.name === formValue.client) {
          // no borrar
          newResulSales.push({
            ...element,
            serviceUsed: serviceUsed,
            serviceActived: serviceActived,
          });
        }
      }else{
        newResulSales.push({
          ...element,
          serviceUsed: serviceUsed,
          serviceActived: serviceActived,
        });
      }
    });

    console.log("newResulSales", newResulSales);
    this.result = newResulSales;
  }

  getDataBydate(date?, date2?, date3?) {
    let dateSelected;
    if (date) {
      dateSelected = date;
    } else {
      dateSelected = this.dateString;
    }
    if (date3 === "" || date3 === null) {
      this._GeneralServiceService
        .getSalesByDateRange("sales", dateSelected, date2)
        .subscribe((data) => {
          this.result = data.map((e) => {
            console.log(e.payload.doc.data());
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
            } as Sales;
          });
          this.filter();
        });
    } else {
      this._GeneralServiceService
        .getSalesByDateRangeAndUsaed("sales", dateSelected, date2)
        .subscribe((data) => {
          this.result = data.map((e) => {
            console.log(e.payload.doc.data());
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
            } as Sales;
          });

          this.filter();
        });
    }
  }
  getCurrentDate() {
    let dates = new Date();
    this.dateString =
      dates.getFullYear() +
      "-" +
      this.appendLeadingZeroes(dates.getMonth() + 1) +
      "-" +
      this.appendLeadingZeroes(dates.getDate());
  }
  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }
}
