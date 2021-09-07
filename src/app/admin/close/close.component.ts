import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.css']
})
export class CloseComponent implements OnInit {
  public _formEntity: FormGroup;
  result: any;
  dateString: string;
  constructor(public _GeneralServiceService: GeneralServiceService) { }

  ngOnInit() {
    this.initiForm();
  }

  initiForm() {
    this._formEntity = new FormGroup({
      date: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    let formValue;
    formValue = this._formEntity.value;
    if (this._formEntity.valid) {
      console.log("formValue", formValue);
      this.getDataBydate(formValue.date);
    }
  }

  
  getDataBydate(date?) {
    let dateSelected;
    if (date) {
      dateSelected = date;
    } else {
      dateSelected = this.dateString;
    }
    this._GeneralServiceService
      .getSaleBydate("close", "date", dateSelected)
      .subscribe((data) => {
        this.result = data.map((e) => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as any;
        });
      });
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
