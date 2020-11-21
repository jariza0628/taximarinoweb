import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {GeneralServiceService} from '../services/general-service.service';
  
import { Commission } from '../models/commission.model';

@Component({
  selector: 'app-comision',
  templateUrl: './comision.component.html',
  styleUrls: ['./comision.component.css']
})
export class ComisionComponent implements OnInit {
  public _formEntity: FormGroup;
  public data: any;
  public edit: boolean;
 
  editUser: any;
  total: number;
  selectedDoor: any;

  constructor(private _GeneralServiceService: GeneralServiceService) {
 
    this.total = 0;
    this._formEntity = new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl('', [
         Validators.maxLength(100)
      ]),
      dni: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]) 
    });
  }

  ngOnInit() {
 
     this.getData();
  }

  save() {
   
    console.log('asd', this._formEntity.value);
    this._GeneralServiceService.createFirebase('commissions', this._formEntity.value);
    this._formEntity.reset();
   }

  getData() {
    this._GeneralServiceService.getFirebase('commissions').subscribe(
      data => {
        // console.log('dara', data);
        this.data = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Commission;
        });
      });
  }

 

  deleteUser(id) {
    console.log(id);
    this._GeneralServiceService.deleteFirebase('commissions', id);
  }

  updateUser() {
    console.log('updateUser', this._formEntity.value);
    this.edit = false;
    this._GeneralServiceService.updateFirebase('commissions', this._formEntity.value);
    this.cancelUpdate();
  }

  updateUserAct(dataToEdit) {
    this.edit = true;
    this.loadDataForm(dataToEdit);
  }

  cancelUpdate() {
    this._formEntity.reset();
    this.edit = false;
   }

  loadDataForm(dataToEdit: Commission) {
    console.log('loadDataForm', dataToEdit);

    this._formEntity = new FormGroup({
      id: new FormControl(dataToEdit.id, []),
      name: new FormControl(dataToEdit.name, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl(dataToEdit.description, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      dni: new FormControl(dataToEdit.dni, [
        Validators.required,
        Validators.maxLength(20)
      ])      
    });

 
  }

   
   
  

 

   

}
