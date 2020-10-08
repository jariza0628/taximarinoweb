import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GeneralServiceService } from '../admin/services/general-service.service';

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.css']
})
export class ReportAdminComponent implements OnInit {
  public _formEntity: FormGroup;
  result: any;
  sellers: any;
  constructor(
    public _GeneralServiceService: GeneralServiceService
  ) { }

  ngOnInit() {
    this.initForm();
    this.result = [];
    this.sellers = [];
    this.getSellers();
  }
  initForm(){
    this._formEntity = new FormGroup({
      date: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      seller: new FormControl(null , [
        Validators.required,
        Validators.maxLength(100),
      ]),
      
    });
  }

  submit(){
    console.log('formValue', this._formEntity.value);
    
    let formValue;
    formValue = this._formEntity.value;
    this.getSales(formValue.seller, formValue.date);
  }

  getSales(seller, date){
    this._GeneralServiceService.getSalesByDateAndSeller('sales', seller, date).subscribe(
      data =>{
        this.result = data.map((e) => {
           console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as any;
        });
      }
    )
  }
  getSellers(){
    this._GeneralServiceService.getSeller().subscribe(
      data =>{
        this.sellers = data.map((e) => {
           console.log('users', e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as any;
        });
      }
    )
  }

}
