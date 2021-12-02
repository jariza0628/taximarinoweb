import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Service} from '../models/service.model';
import {Bracelets} from '../models/inventory.model';

import {GeneralServiceService} from '../services/general-service.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  _formEntity: FormGroup;
  sellers: any;
  date: any;
  range: Array<Bracelets>;
  services: any[] = [];
  inventory: any[] = [];
  inventoryFilter: any[] = [];
  active = 1;
  nameSeller = '';
  nameService = '';

  constructor(public _GeneralServiceService: GeneralServiceService) {
    this.range = [];
  }

  ngOnInit() {
    this.date = this._GeneralServiceService.getDateNow();
    this.initiForm();
    this.sellers = [];
    this.range = [];
    this.getSellers();
    this.getServices();
    this.getInventory();
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
      service: new FormControl(null, Validators.required),
    });
  }

  getSellers() {
    this._GeneralServiceService.getFirebase('users').subscribe((data) => {
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

  /**
   * get inventory from firebase
   */
  getInventory() {
    this._GeneralServiceService.getFirebase('inventorry').subscribe((data) => {
      // console.log('dara', data);
      this.inventory = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as any;
      });
      this.inventoryFilter = [...this.inventory];
    });
  }

  /**
   * get services from firebase
   */
  getServices() {
    this._GeneralServiceService.getFirebase('service').subscribe(data => {
      this.services = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        };
      });
    });
  }

  submit() {
    this.date = this._GeneralServiceService.getDateNow();
    this.range.forEach(item => {
      this._GeneralServiceService.createFirebase('inventorry', item);
    });
    this._formEntity.reset('');
    this.range = []
    window.alert('Manillas Creadas');
  }

  preview() {
    if (this._formEntity.invalid) {
      window.alert('Todos los campos son obligatorios');
    } else {
      let formValue;
      formValue = this._formEntity.value;
      this.range = [];
      if (formValue.range_1 < formValue.range_2) {
        for (let index = formValue.range_1; index < formValue.range_2; index++) {
          this.range.push({
            codebar: '' + index,
            status: 'Active',
            nameService: formValue.service.name,
            service: formValue.service,
            nameSeller: formValue.seller.user,
            seller: formValue.seller,
          });
        }
      } else {
        alert('Rango incorrectos');
      }
    }

  }

  /**
   * filter inventories already brought in from firebase
   * @ParamsQuery  nameSeller: filter by name of seller in inventory
   * @ParamsQuery  nameService: filter by name of service in inventory
   */
  filterInventory() {
    this.inventoryFilter = this.nameSeller ?
      this.inventory.filter(item => item.nameSeller.toLowerCase().includes(this.nameSeller.toLowerCase())) : this.inventory;
    this.inventoryFilter = this.nameService ?
      this.inventoryFilter.filter(item => item.nameService.toLowerCase().includes(this.nameService.toLowerCase())) : this.inventoryFilter;
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
