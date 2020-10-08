import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sales } from '../models/sales';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-codebar',
  templateUrl: './codebar.component.html',
  styleUrls: ['./codebar.component.css']
})
export class CodebarComponent implements OnInit {
  data: any;
  public _formEntity: FormGroup;

  constructor(
    private _GeneralServiceService: GeneralServiceService
  ) { 
    this.data = [];
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this._formEntity = new FormGroup({
      codebar: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      
    });
  }
  submitFilter(){
    let formValue;
    formValue = this._formEntity.value;
    this.getSehech(formValue.codebar);

  }
  getSehech(code){
    this._GeneralServiceService.getSalesBydaCodeBar('sales', code).subscribe(
      data => {
        this.data = data.map((e) => {
           console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Sales;
        });
      }
    )
  }

}
