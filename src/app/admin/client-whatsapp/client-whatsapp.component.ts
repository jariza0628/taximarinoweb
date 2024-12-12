import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../services/general-service.service';
import { ZenviaService } from '../services/zenvia.service';
import { ExcelService } from '../services/excel.service';
@Component({
  selector: 'app-client-whatsapp',
  templateUrl: './client-whatsapp.component.html',
  styleUrls: ['./client-whatsapp.component.css']
})
export class ClientWhatsappComponent implements OnInit {
  public _formEntity: FormGroup;
  result: any;
  dateString: string;

  plantillaId: any;
  plantillas: any = [];
  constructor(public _GeneralServiceService: GeneralServiceService,public _ExcelService: ExcelService, public _ZenviaService: ZenviaService) { }

  ngOnInit() {
    this.initiForm();
    this.getPlantillas();
    this.result = [];
  }

  initiForm() {
    this._formEntity = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      date2: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    let formValue;
    formValue = this._formEntity.value;
    if (this._formEntity.valid) {
      console.log("formValue", formValue);
      this.getDataBydateRange();
    }
  }

  exportExcel(){
    this._ExcelService.exportToExcel(this.result, "Clientes Whatsapp");

  }
  
  getDataBydate(date?) {
    let dateSelected;
    if (date) {
      dateSelected = date;
    } else {
      dateSelected = this.dateString;
    }
    this._GeneralServiceService
      .getSaleBydate("ClientesWhatsapp", "date", dateSelected)
      .subscribe((data) => {
        this.result = data.map((e) => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as any;
        });
      });
  }
  getDataBydateRange() {
    let formValue;
    formValue = this._formEntity.value;

    this._GeneralServiceService
      .getSalesByDateRange("ClientesWhatsapp", formValue.date, formValue.date2)
      .subscribe((data) => {
        this.result = data.map((e) => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as any;
        });
      });
  }

  sendMassive(){
    console.log(this.result + " " + this.plantillaId);
    if(this.plantillaId && this.result.length > 0){
      this.result.forEach(element => {
        if(element.clientNumber){
          this._ZenviaService.sendMessageByplantillaID("573165228827", element.clientNumber, this.plantillaId).subscribe((data) => {
            console.log(data);
          });
        }
       
      });
      alert(this.result.length + " Mensajes enviados via Whatsapp (Zembia)");

      
    }
    
  }
  sendIndividual(celDestino){
    console.log(this.result + " " + this.plantillaId);
    if(this.plantillaId && this.result.length > 0){
      
        if(celDestino){
          this._ZenviaService.sendMessageByplantillaID("573165228827",celDestino, this.plantillaId).subscribe((data) => {
            console.log(data);
            alert("Mensaje enviado al #: " + celDestino);
          });
        }
       
    }
  }

  getCurrentDate() {
    let dates = new Date();
    this.dateString =
      dates.getFullYear() +
      "-" +
      this.appendLeadingZeroes(dates.getMonth() + 1) +
      "-" +
      this.appendLeadingZeroes(dates.getDate());
  }
  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }
  getPlantillas(){
    this._ZenviaService.getAllpantillas().subscribe((data) => {
      this.plantillas = data;
    });
  }
}
