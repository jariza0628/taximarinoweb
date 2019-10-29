import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PointSale } from '../models/pointsale.model';

@Component({
  selector: 'app-point-sale',
  templateUrl: './point-sale.component.html',
  styleUrls: ['./point-sale.component.css']
})
export class PointSaleComponent implements OnInit {
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
      closetime: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      opentime: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  ngOnInit() {
    this.getData();
  }

  save() {
    console.log('asd', this._formEntity.value);
    this._GeneralServiceService.createFirebase('pointsale', this._formEntity.value);
  }
  getData() {
    this._GeneralServiceService.getFirebase('pointsale').subscribe(
      data => {
        // console.log('dara', data);
        this.data = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as PointSale;
        });
      });
  }
  deleteUser(id) {
    console.log(id);
    this._GeneralServiceService.deleteFirebase('pointsale', id);
  }
  updateUser() {
    console.log('updateUser', this._formEntity.value);
    this.edit = false;
    this._GeneralServiceService.updateFirebase('pointsale', this._formEntity.value);
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

  loadDataForm(dataToEdit: PointSale) {
    console.log('loadDataForm', dataToEdit);

    this._formEntity = new FormGroup({
      id: new FormControl(dataToEdit.id, []),
      name: new FormControl(dataToEdit.name, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      closetime: new FormControl(dataToEdit.closetime, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      opentime: new FormControl(dataToEdit.opentime, [
        Validators.required
      ]),


    });

  }


}
