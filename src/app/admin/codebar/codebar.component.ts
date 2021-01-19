import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plan } from '../models/plan.model';
import { Sales } from '../models/sales';
import { Service } from '../models/service.model';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-codebar',
  templateUrl: './codebar.component.html',
  styleUrls: ['./codebar.component.css']
})
export class CodebarComponent implements OnInit {
  data: Sales[];
  services: Service[];
  plans: Plan[];
  itemToedit: number;
  itemToeditPlans: number;
  public _formEntity: FormGroup;
  public _formEntityEdit: FormGroup;
  constructor(
    private router: Router,
    private _GeneralServiceService: GeneralServiceService
  ) { 
    this.itemToedit = -1;
    this.itemToeditPlans = -1;
  }

  ngOnInit() {
    this.initForm();
    this.getData();
    this.getDataPlans();
    this.initFormEditItem();
    if(this.router.url === '/admin/codebar'){
      let email = localStorage.getItem('userlog');
      if(email !== 'jefferariza@outlook.com'){
        return this.router.navigateByUrl('/admin/new-sales');

      }
    }

  }
  initFormEditItem(){
    this._formEntityEdit = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
    })
  }
  changeToEdit(index){

    this.itemToedit = index;
  }
  changeToEditPlns(index){

    this.itemToeditPlans = index;
  }
  initForm(data?: Sales) {
    this.itemToedit = -1;
    this.itemToeditPlans = -1;
    if(data){
      this._formEntity = new FormGroup({
        codebar: new FormControl(data.codebar, [
          Validators.maxLength(100),
        ]),
        seller: new FormControl(data.seller, [
          Validators.maxLength(100),
        ]),
        state: new FormControl(data.state, [
          Validators.maxLength(100),
        ]),
        tarjeta: new FormControl(data.tarjeta, [
          Validators.maxLength(100),
        ]),
        total: new FormControl(data.total, [
          Validators.maxLength(100),
        ]),
        typepay: new FormControl(data.typepay, [
          Validators.maxLength(100),
        ]),
        vaucher: new FormControl(data.vaucher, [
          Validators.maxLength(100),
        ]),
        zone: new FormControl(data.zone, [
          Validators.maxLength(100),
        ]),
        dni: new FormControl(data.dni, [
          Validators.maxLength(100),
        ]),
        efecty: new FormControl(data.efecty, [
          Validators.maxLength(100),
        ]),
        hour: new FormControl(data.hour, [
          Validators.maxLength(100),
        ]),
        name: new FormControl(data.name, [
          Validators.maxLength(100),
        ]),
        date: new FormControl(data.date, [
          Validators.maxLength(100),
        ]),
        description: new FormControl('', [
          Validators.maxLength(100),
        ]),
      });

    }else{
      this._formEntity = new FormGroup({
        codebar: new FormControl("", [
          Validators.maxLength(100),
        ]),
        seller: new FormControl("", [
          Validators.maxLength(100),
        ]),
        state: new FormControl("", [
          Validators.maxLength(100),
        ]),
        tarjeta: new FormControl("", [
          Validators.maxLength(100),
        ]),
        total: new FormControl("", [
          Validators.maxLength(100),
        ]),
        typepay: new FormControl("", [
          Validators.maxLength(100),
        ]),
        vaucher: new FormControl("", [
          Validators.maxLength(100),
        ]),
        zone: new FormControl("", [
          Validators.maxLength(100),
        ]),
        dni: new FormControl("", [
          Validators.maxLength(100),
        ]),
        efecty: new FormControl("", [
          Validators.maxLength(100),
        ]),
        hour: new FormControl("", [
          Validators.maxLength(100),
        ]),
        name: new FormControl("", [
          Validators.maxLength(100),
        ]),
        date: new FormControl("", [
          Validators.maxLength(100),
        ]),
        description: new FormControl('', [
          Validators.maxLength(100),
        ]),
      });
    }
 
  }
 
  submitFilter(){
    let formValue;
    formValue = this._formEntity.value;
    this.getSehech(formValue.codebar);

  }
  getData() {
    this._GeneralServiceService.getFirebase("service").subscribe((data) => {
      console.log("dara", data);
      this.services = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Service;
      });
     
     });
  }
  getDataPlans() {
    this._GeneralServiceService.getFirebase("plan").subscribe((data) => {
      console.log("dara", data);
      this.plans = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Plan;
      });
    });
  }
  getSehech(code){
    this._GeneralServiceService.getSalesBydaCodeBar('sales', code).subscribe(
      data => {
        this.data = data.map((e) => {
          this.initForm(e.payload.doc.data());

           console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Sales;
        });
      }
    )
  }
  // Carga plan al array de 
  loadPlan(e) {
    console.log("ch", e);
    this.addValueToArraySelectPlan(e);
  }

  addValueToArraySelectPlan(item) {
    this._GeneralServiceService.getById("plan", item).then(
      (datas) => {
        console.log("datas", datas.data());
        this.psPlan(datas.data());
      },
      (err) => {
        console.log(err);
      }
    );
  }

  psPlan(data) {
    this.data[0].total = Number(this.data[0].total) + Number(data.totalvalue);
    this.data[0].plans.push(data);
  }
  // FIN *****
  // CArgar servicios individuales al array para actualizar
  onChangeServ(deviceValue) {
    console.log(deviceValue);
    this.addValueToArraySelect(deviceValue);
  }

  addValueToArraySelect(item) {
    this._GeneralServiceService.getById("service", item).then(
      (datas) => {
        console.log("datas", datas.data());
        this.ps(datas.data());
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ps(data) {
    this.data[0].total = Number(this.data[0].total) + Number(data.publicvalue);
    this.data[0].detail.push(data);
   }
  // FIN ****
  // Eliminar Servicios del Array
  removeItemFromArr(item) {
    let i;
    i = this.data[0].detail.indexOf(item);
    this.data[0].total = this.data[0].total - item.publicvalue;
    if (i !== -1) {
      this.data[0].detail.splice(i, 1);
    }
  }
  // elimiar plans
  removeItemFromArrPlan(item) {
    let i;
    i = this.data[0].plans.indexOf(item);

     this.data[0].total =  this.data[0].total - item.totalvalue;

    if (i !== -1) {
      this.data[0].plans.splice(i, 1);
    }
  }
  saveRowEdit(item){
    console.log('saveRowEdit',item);
    this.itemToedit = -1;
  }
  saveRowEditPlans(item){
    console.log('saveRowEdit',item);
    this.itemToeditPlans = -1;
  }
  editSale(){
    let formValue: Sales = this._formEntity.value;
    this.data[0].name = formValue.name;
    this.data[0].tarjeta = formValue.tarjeta;
    this.data[0].total = formValue.total;
    this.data[0].efecty = formValue.efecty;
    this.data[0].vaucher = formValue.vaucher;
    this.data[0].zone = formValue.zone;
    this.data[0].detail.forEach((element) => {
      element.publicvalue = Number(element.publicvalue)
    })
    if(this.data[0].plans.length > 0){
      this.data[0].plans[0].totalvalue = Number(this.data[0].plans[0].totalvalue)
    }
    if(formValue.description!==''){
      this.data[0].description = formValue.description;
    }
    
     
     this._GeneralServiceService.updateFirebase('sales', this.data[0])
     alert('Cambios guardados');
  }

}
