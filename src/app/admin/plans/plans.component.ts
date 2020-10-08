import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {GeneralServiceService} from '../services/general-service.service';
import {Plan} from '../models/plan.model';
import {Service} from '../models/service.model';
import {Agency} from '../models/agency.model';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})

export class PlansComponent implements OnInit {
  public _formEntity: FormGroup;
  public data: any;
  public edit: boolean;
  public arraySelect: any[];
  public dataServices: any;
  public dataAgency: any;
  editUser: any;
  total: number;
  selectedDoor: any;

  constructor(private _GeneralServiceService: GeneralServiceService) {
    this.arraySelect = [];
    this.total = 0;
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
      totalvalue: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      discount: new FormControl(0, [
          Validators.max(100),
          Validators.min(0)
        ]
      ),
      agency: new FormControl('', [
        Validators.maxLength(100)
      ]),
      services: new FormControl([], []),
      selectedDoor: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.getServices();
    this.getAgencies();
    console.log(' this.dataServices', this.dataServices);
    this.getData();
  }

  save() {
    this._formEntity.controls['services'].setValue(this.arraySelect);
    console.log('asd', this._formEntity.value);
    this._GeneralServiceService.createFirebase('plan', this._formEntity.value);
    this._formEntity.reset();
    this.arraySelect = [];
  }

  getData() {
    this._GeneralServiceService.getFirebase('plan').subscribe(
      data => {
        // console.log('dara', data);
        this.data = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Plan;
        });
      });
  }

  async getServices() {
    this._GeneralServiceService.getFirebase('service').subscribe(
      data => {
        // console.log('getServices', data);
        this.dataServices = data.map(e => {
          console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Service;
        });
      });

  }

  async getAgencies() {
    this._GeneralServiceService.getFirebase('agency').subscribe(
      data => {
        // console.log('getServices', data);
        this.dataAgency = data.map(e => {
          console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Agency;
        });
      });

  }

  deleteUser(id) {
    console.log(id);
    this._GeneralServiceService.deleteFirebase('plan', id);
  }

  updateUser() {
    console.log('updateUser', this._formEntity.value);
    this._formEntity.controls['services'].setValue(this.arraySelect);
    this.arraySelect = [];
    this.edit = false;
    this._GeneralServiceService.updateFirebase('plan', this._formEntity.value);
    this.cancelUpdate();
  }

  updateUserAct(dataToEdit) {
    this.edit = true;
    this.loadDataForm(dataToEdit);
  }

  cancelUpdate() {
    this._formEntity.reset();
    this.edit = false;
    this.arraySelect = [];
  }

  loadDataForm(dataToEdit: Plan) {
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
      totalvalue: new FormControl(dataToEdit.totalvalue, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      discount: new FormControl(dataToEdit.discount, [
          Validators.max(100),
          Validators.min(0)
        ]
      ),
      agency: new FormControl(dataToEdit.agency, [
        Validators.maxLength(100)
      ]),
      services: new FormControl('', []),
      selectedDoor: new FormControl('', [
        Validators.maxLength(100)
      ]),


    });

    this.arraySelect = dataToEdit.services || [];

  }

  onChange(deviceValue) {
    console.log(deviceValue);
    this.addValueToArraySelect(deviceValue);
  }

  getRecDet(deviceValue: any) {
    console.log(deviceValue);
    this.addValueToArraySelect(deviceValue);
  }

  /**
   * Alñadir valor al selecionar un aopcion del select
   *     function (doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          this.ps(doc.data());
        } else {
          console.log('No such document!');
        }
      }).catch(function (error) {
        console.log('Error getting document:', error);
      });
   */
  addValueToArraySelect(item) {

    this._GeneralServiceService.getById('service', item).then(
      datas => {
        // console.log('datas', datas.data());
        const data = datas.data();
        let existsService;
        this.arraySelect.forEach(service => {
            if (JSON.stringify(service) === JSON.stringify(data)) {
              existsService = data;
              return;
            }
          }
        );

        if (!existsService) {
          this.ps(datas.data());
        }
      }, err => {
        console.log(err);
      }
    );
  }

  ps(data) {
    this.total = this.total + data.publicvalue;
    this.arraySelect.push(data);
    console.log(this.arraySelect);
    this.sunValueTotal();

  }

  sunValueTotal() {
    this._formEntity.controls['totalvalue'].setValue(this.total);

  }

  removeItemFromArr(item) {
    let i;
    i = this.arraySelect.indexOf(item);

    if (i !== -1) {
      this.arraySelect.splice(i, 1);
    }
  }

}
