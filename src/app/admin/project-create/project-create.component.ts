import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../models/user.model';
import { GeneralServiceService } from '../services/general-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PointSale } from '../models/pointsale.model';
import { PointSaleComponent } from '../point-sale/point-sale.component';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  public _formEntity: FormGroup;
  public users: any;
  public zones: any;
  public editUser: boolean;
  constructor(private _GeneralServiceService: GeneralServiceService) {
    this.editUser = false;
    this._formEntity = new FormGroup({
      id: new FormControl(null),
      user: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      password: new FormControl(null, [
        Validators.required
      ]),
      dni: new FormControl(null, [
        Validators.required
      ]),
      phone: new FormControl(null, [
        Validators.required
      ]),
      type: new FormControl('', [
        Validators.required,
      ]),
      zone: new FormControl('', [
        Validators.required,
      ]),
      typeverify: new FormControl('', [
        Validators.required,
      ]),


    });
  }

  ngOnInit() {
    this.getUsers();
    this.getZones();
  }

  saveUser() {
    console.log('asd', this._formEntity.value);
    this._GeneralServiceService.createFirebase('users', this._formEntity.value);
    this._formEntity.reset();
  }
  getUsers() {
    this._GeneralServiceService.getFirebase('users').subscribe(
      data => {
        // console.log('dara', data);
        this.users = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as User;
        });
      });
  }

  getZones() {
    this._GeneralServiceService.getFirebase('pointsale').subscribe(
      data => {
        // console.log('dara', data);
        this.zones = data.map(e => {
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
    this._GeneralServiceService.deleteFirebase('users', id);
  }
  updateUser() {
    console.log('updateUser', this._formEntity.value);
    this.editUser = false;
    this._GeneralServiceService.updateFirebase('users', this._formEntity.value);
    this.cancelUpdate();
  }

  updateUserAct(userToedit) {
    this.editUser = true;
    this.loadDataForm(userToedit);
  }

  cancelUpdate() {
    this._formEntity.reset();
    this.editUser = false;
  }

  loadDataForm(userToedit: User) {
    console.log('loadDataForm', userToedit);

    this._formEntity = new FormGroup({
      id: new FormControl(userToedit.id, []),
      user: new FormControl(userToedit.user, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      email: new FormControl(userToedit.email, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      password: new FormControl(userToedit.password, [
        Validators.required
      ]),
      dni: new FormControl(userToedit.dni, [
        Validators.required
      ]),
      phone: new FormControl(userToedit.phone, [
        Validators.required
      ]),
      type: new FormControl(userToedit.type, [
        Validators.required,
      ]),
      zone: new FormControl(userToedit.pintsale, [
        Validators.required,
      ]),
      typeverify: new FormControl('', [
        Validators.required,
      ])
    });

  }


}
