import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PointSale } from '../models/pointsale.model';
import { Agency } from '../models/agency.model';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  public _formEntity: FormGroup;
  public data: any;
  public edit: boolean;
  editUser: any;
  constructor(private _GeneralServiceService: GeneralServiceService) {
    this.edit = false;
    this._formEntity = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      description: new FormControl('', [
        Validators.maxLength(100)
      ]),
      nit: new FormControl('', [
        Validators.maxLength(100)
      ]),
      address: new FormControl('', [
        Validators.maxLength(100)
      ]),
      city: new FormControl('', [
        Validators.maxLength(100)
      ]),
    });
  }

  ngOnInit() {
    this.getData();
  }

  save() {
    this._GeneralServiceService.createFirebase('agency', this._formEntity.value);
  }
  getData() {
    this._GeneralServiceService.getFirebase('agency').subscribe(
      data => {
        // console.log('dara', data);
        this.data = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Agency;
        });
      });
  }
  deleteUser(id) {
    console.log(id);
    this._GeneralServiceService.deleteFirebase('agency', id);
  }
  updateUser() {
    console.log('updateUser', this._formEntity.value);
    this.edit = false;
    this._GeneralServiceService.updateFirebase('agency', this._formEntity.value);
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

  loadDataForm(dataToEdit: Agency) {
    console.log('loadDataForm', dataToEdit);

    this._formEntity = new FormGroup({
      id: new FormControl(dataToEdit.id, []),
      name: new FormControl(dataToEdit.name, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      description: new FormControl(dataToEdit.description, [
         Validators.maxLength(100)
      ]),
      nit: new FormControl(dataToEdit.nit, [
        Validators.maxLength(100)
      ]),
      address: new FormControl(dataToEdit.address, [
        Validators.maxLength(100)
      ]),
      city: new FormControl(dataToEdit.city, [
        Validators.maxLength(100)
      ]),
    });
  }


}
