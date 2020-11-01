import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Service } from "../models/service.model";
import { Bracelets } from "../models/inventory.model";

import { GeneralServiceService } from "../services/general-service.service";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.css"],
})
export class InventoryComponent implements OnInit {
  _formEntity: FormGroup;
  sellers: any;
  date: any;
  range: Array<Bracelets>;
  constructor(public _GeneralServiceService: GeneralServiceService) {
    this.range = [];
  }

  ngOnInit() {
    this.date = this._GeneralServiceService.getDateNow();
    this.initiForm();
    this.sellers = [];
    this.range = [];
    this.getSellers();
    console.log(this.date);
    
  }

  initiForm() {
    this._formEntity = new FormGroup({
      range_1: new FormControl(null, [
        Validators.required,
        Validators.maxLength(9),
      ]),
      range_2: new FormControl(null, [
        Validators.required,
        Validators.maxLength(9),
      ]),
      seller: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      agency: new FormControl(null, []),
      date: new FormControl(this.date.date, []),
      hour: new FormControl(this.date.hour, []),
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
    });
  }
  submit(){
    this.date = this._GeneralServiceService.getDateNow();
    let formValue;
    formValue = this._formEntity.value;
    console.log('formValue', formValue);
    
  }

  preview(){
    let formValue;
    formValue = this._formEntity.value;
    console.log('formValue', formValue);
    if(formValue.range_1 < formValue.range_2){
      for (let index = formValue.range_1; index < formValue.range_2; index++) {
        this.range.push({
          codebar: ''+index,
          status: 'Active'
        })
      }
    }else{
      alert('Rango incorrectos')
    }
  }
}
/**
 *     id?: any;
    date: string;
    hour: string;
    seller: any;
    id_seller: any;
    range_1: number;
    range_2:number;
    bracelet: Array<Bracelets>
    type: 'Agencia' | 'Normal';
    agency?: any;
    agency_id?: string;
}
 */
