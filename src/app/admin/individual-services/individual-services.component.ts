import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
 import { Service } from '../models/service.model';

@Component({
  selector: 'app-individual-services',
  templateUrl: './individual-services.component.html',
  styleUrls: ['./individual-services.component.css']
})
export class IndividualServicesComponent implements OnInit {
  public _formEntity: FormGroup;
  public data: any;
  public edit: boolean;
  constructor(private _GeneralServiceService: GeneralServiceService) {
    this.edit = false;
    this._formEntity = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      publicvalue: new FormControl(null, [
        Validators.required
      ]),
      agencyvalue: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  ngOnInit() {
    this.getData();
  }

  save() {
    console.log('asd', this._formEntity.value);
    this._GeneralServiceService.createFirebase('service', this._formEntity.value);
  }
  getData() {
    this._GeneralServiceService.getFirebase('service').subscribe(
      data => {
        // console.log('dara', data);
        this.data = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Service;
        });
      });
  }
  deleteUser(id) {
    console.log(id);
    this._GeneralServiceService.deleteFirebase('service', id);
  }
  updateUser() {
    console.log('updateUser', this._formEntity.value);
    this.edit = false;
    this._GeneralServiceService.updateFirebase('service', this._formEntity.value);
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

  loadDataForm(dataToEdit: Service) {
    console.log('loadDataForm', dataToEdit);

    this._formEntity = new FormGroup({
      id: new FormControl(dataToEdit.id, []),
      name: new FormControl(dataToEdit.name, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      description: new FormControl(dataToEdit.description, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      publicvalue: new FormControl(dataToEdit.publicvalue, [
        Validators.required
      ]),
      agencyvalue: new FormControl(dataToEdit.agencyvalue, [
        Validators.required
      ]),


    });

  }
}
