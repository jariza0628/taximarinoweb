import { Component, ElementRef, OnInit, ViewChild,HostListener  } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GeneralServiceService } from "../services/general-service.service";
import { Plan } from "../models/plan.model";
import { Service } from "../models/service.model";
import { v4 as uuidv4 } from "uuid";
import { Tickets } from "src/utils/ticket";
import { Commission } from "../models/commission.model";
import { ZenviaService } from "../services/zenvia.service";
import { timeStamp } from "console";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: "app-new-sales",
  templateUrl: "./new-sales.component.html",
  styleUrls: ["./new-sales.component.css"],
})
export class NewSalesComponent implements OnInit {
  @ViewChild('dataSeacrh', null) dataSeacrh: ElementRef;
  @ViewChild('codigoInput', null) codigoInput: ElementRef;

  public receipt: boolean;
  public _formEntity: FormGroup;

  filteredOptions: Observable<any[]>;


  arraySelectPlan: any;
  arraySelect: any;
  services: any;
  plans: any;
  total: any;
  totalValue: any;
  barcodes: any;
  code: string;
  dataFormvalue: any;

  checmanual:any;

  showmixprice: boolean;
  typepay: any;
  efecty: any;
  tarjeta: any;

  vaucher: any

  sellers: any;

  arryTMP: any;
  arryTMPagencias: any;

  seacrhData: any;

  generalSale: GeneralSale = {};

  ticke = new Tickets();
  user: any;
  sellerSelected: any;

  codinicial:number;
  codfinal:number;

  checkrango:boolean;
  public datac: any;
  public agencias: any;
  constructor(private _GeneralServiceService: GeneralServiceService, private zenviaService: ZenviaService) {
    this.receipt = false;
    this.arraySelectPlan = [];
    this.arraySelect = [];
    this.totalValue = 0;
    this.total = 0;
    this.barcodes = [];
    this.showmixprice = false;

    this.agencias = [];

    this.typepay = "Efectivo";

    this.code = "";
    this.codinicial = 0;
    this.codfinal = 0;
    this.initFomr();
    this.sellerSelected = localStorage.getItem('sellerSelected');

  }

  ngOnInit() {
    this.vaucher = null;
    this.getData();
    this.getDataPlans();
    this.getSellers();
    this.getDataComisionitas();
    this.checmanual = false;
    this.getAgencias();
    //this.sendMessage('573045268723');
    
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.serach(this.dataSeacrh.nativeElement.value);
      console.log(this.dataSeacrh.nativeElement.value);
      
    }
  }
  sendMessage(nuerocliente: string) {
    const from = '573165228827';
    //const to = '573045268764';
    const templateId = '5c35b1e4-3f85-4791-aad4-3efbbd043b5d';
    const fields = { '1': 'demo' };
    if(nuerocliente){

      this.zenviaService.sendMessage(from, nuerocliente, templateId, fields).subscribe(
        response => {
          console.log('Message sent successfully', response);
        },
        error => {
          console.error('Error sending message', error);
        }
      );

    }else{
      console.log('No se envio mensaje');
    }

   
  }
  initFomr(){
    let usuaerSelect;
    if(localStorage.getItem('sellerSelected')){

    }else{
      usuaerSelect = "Williamventa4"
    }
    usuaerSelect = localStorage.getItem('sellerSelected')
    this._formEntity = new FormGroup({
      name: new FormControl("", [
        Validators.maxLength(100),
        Validators.required,
      ]),
      numeroCliente: new FormControl("", [
        Validators.maxLength(15),
        Validators.minLength(10),
        Validators.required,
      ]),
      emailCliente: new FormControl("", [
        Validators.maxLength(100),
        Validators.required,
      ]),
      comisionista: new FormControl("", [
        Validators.maxLength(100),
      ]),
      seller: new FormControl(usuaerSelect, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      dni: new FormControl("", [
        Validators.maxLength(100),
        Validators.required,
      ]),
    });
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
      this.arryTMP = this.services;
    });
  }

  selectSeller(e) {
    this.sellerSelected = e
    console.log(e);
  }
  saveSelect(){
    localStorage.setItem('sellerSelected', this.sellerSelected);
    // this.router.navigate(['admin/new-sales']);
    this.initFomr();
  }

  restDate() {
    this.arryTMP = this.services;
  }
  restDateAgevias() {
    this.arryTMPagencias = this.agencias;
  }
  serach(dataToSearch) {

    if (!isNaN(dataToSearch)) {
      console.log("El parámetro es un número. Agregar lógica aquí si es necesario.");
      // Puedes agregar tu lógica específica para el caso de números aquí.
      console.log("dataToSearch", dataToSearch);
      this.arryTMP = [];
      this.services.forEach((element) => {
        if (element.code == dataToSearch) {
          this.arryTMP.push(element);
        }
      });
      return;
    }
    
    console.log("dataToSearch", dataToSearch);
    this.arryTMP = [];
    this.services.forEach((element) => {
      if (element.name.toLowerCase().includes(dataToSearch.toLowerCase())) {
        this.arryTMP.push(element);
      }
    });
    console.log("this.arryTMP", this.arryTMP);
    //this.dataSeacrh.nativeElement.value = '';

    
  }

  serachAgencia(dataToSearch) {

    // if (!isNaN(dataToSearch)) {
    //   console.log("El parámetro es un número. Agregar lógica aquí si es necesario.");
    //   // Puedes agregar tu lógica específica para el caso de números aquí.
    //   console.log("dataToSearch", dataToSearch);
    //   this.arryTMP = [];
    //   this.agencias.forEach((element) => {
    //     if (element.name == dataToSearch) {
    //       this.arryTMP.push(element);
    //     }
    //   });
    //   return;
    // }
     console.log("dataToSearch", dataToSearch);
    this.arryTMPagencias = [];
    this.agencias.forEach((element) => {
      if (element.name.toLowerCase().includes(dataToSearch.toLowerCase())) {
        this.arryTMPagencias.push(element);
      }
    });
    console.log("this.arryTMPagencias", this.arryTMPagencias);
    //this.dataSeacrh.nativeElement.value = '';
    
    this.agencias = this.arryTMPagencias;
    
  }
  getDataPlans() {
    this._GeneralServiceService.getFirebase("plan").subscribe((data) => {
      console.log("getDataPlans", data);
      this.plans = data.map((e) => {
        // console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Plan;
      });
    });
  }

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
    this.total = this.total + data.totalvalue;
    this.arraySelectPlan.push(data);
    console.log(this.arraySelectPlan);
  }

  onChangeServ(deviceValue) {
    console.log(deviceValue);
    this.addValueToArraySelect(deviceValue);
  }

  cargarAgencia(agencia: any) {
    this._formEntity.get('name').setValue(agencia.name);
    this._formEntity.get('numeroCliente').setValue(agencia.cellphone);
    this._formEntity.get('emailCliente').setValue(agencia.email);
    this._formEntity.get('dni').setValue(agencia.nit);

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
    this.totalValue = this.totalValue + data.publicvalue;
    this.arraySelect.push(data);
    console.log(this.arraySelect);
  }

  removeItemFromArr(item) {
    let i;
    i = this.arraySelect.indexOf(item);
    this.totalValue = this.totalValue - item.publicvalue;
    if (i !== -1) {
      this.arraySelect.splice(i, 1);
    }
  }

  removeItemFromArrPlan(item) {
    let i;
    i = this.arraySelectPlan.indexOf(item);

    this.total = this.total - item.totalvalue;

    if (i !== -1) {
      this.arraySelectPlan.splice(i, 1);
    }
  }
  alert(msj) {
    alert("msj");
  }
  async validaeCod(val) {
    if (!val) {
      return;
    }
    // get code database
    console.log("code", this.code);
    let find_Code_duplic, cod_vendido;
    let dataResulCode = this.code;

    if (this.code === "" || this.code === null) {
      alert("Ingrese un codigo de barra");
    } else {
      find_Code_duplic = false;

      //Validar si el cod fue vendido
      await this._GeneralServiceService
        .getSalesBydaCodeBar("sales", this.code + "")
        .subscribe(
          (data: any) => {
            console.log("codeBAr search", data + "code:", this.code);
            if (this.code === "") {
              return null;
            } else {
            }
            let info = data.map((e) => {
              console.log(e.payload.doc.data());
              let result;
              result = e.payload.doc.data();
              if (result) {
                cod_vendido = true;

                alert(
                  "El codigo " +
                    this.code +
                    " ya se encuentra regisrado intente con otro"
                );
                this.code = "";
              }
            });
            console.log("info", info);
            if (info.length === 0) {
              this.addCodesave(dataResulCode);
            }
            setTimeout(() => {
              if (this.checmanual == false) {
                this.code = "";

              }
 
            }, 500);
          },
          (err) => {
            console.log(err);
          }
        );
        console.log('this.checmanual', this.checmanual);
        
        setTimeout(() => {
         
          if (this.checmanual == false) {
            this.code = "";
          }
          this.codigoInput.nativeElement.focus();

        }, 500);
    }
  }
  generarRango(){
    if(this.checkrango){
      if (this.codinicial == 0 || this.codfinal == 0) {
        alert('Digite un rango valido');
        return null
  
      } 
      if (this.codinicial >=  this.codfinal) {
        alert('El codigo inical debe ser mayor que el codigo final');
        return null
      } 
  
      
        for (let i = this.codinicial; i <= this.codfinal; i++) {
          console.log(i);
          this.validaeCodRango(i);
          // Puedes hacer algo con cada número, como agregarlo a un array o realizar alguna lógica específica
        }
        this.codinicial = 0 ;
         this.codfinal = 0;
         this.checkrango = false;
    }

    
    
     
  }


  async validaeCodRango(code) {
    
    // get code database
    console.log("code", code);
    let find_Code_duplic, cod_vendido;
    let dataResulCode = code;

    if (code === "" || code === null) {
      //alert("Ingrese un codigo de barra");
    } else {
      find_Code_duplic = false;

      //Validar si el cod fue vendido
      await this._GeneralServiceService
        .getSalesBydaCodeBar("sales", code + "")
        .subscribe(
          (data: any) => {
            console.log("codeBAr search", data + "code:", code);
            if (code === "") {
              return null;
            } else {
            }
            let info = data.map((e) => {
              console.log(e.payload.doc.data());
              let result;
              result = e.payload.doc.data();
              if (result) {
                cod_vendido = true;
                if(this.checkrango){
                  alert(
                    "El codigo # " +
                      code +
                      " ya se encuentra regisrado intente con otro"
                  );
                }
                 
                code = "";
              }
            });
            console.log("info", info);
            if (info.length === 0) {
              this.addCodesave(dataResulCode);
            }
             
          },
          (err) => {
            console.log(err);
          }
        );
         
    }
  }

  addCodesave(code) {
    let find_Code_duplic = false;
    this.barcodes.forEach((element) => {
      if (element.code === code) {
        find_Code_duplic = true;
      }
    });
    if (find_Code_duplic === false) {
      this.barcodes.push({ code: code });
    } else {
      alert(
        "Ya se encuentra registrado el codigo: " +
          code +
          " en esta venta registra otro nuevo."
      );
    }
  }

  removeCode(item) {
    let i;
    i = this.barcodes.indexOf(item);

    if (i !== -1) {
      this.barcodes.splice(i, 1);
    }
  }

  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  async onSubmit1() {
    // let consecutivoinical = 100;
    // let consecutivoinical = 200;
    let impresiones = 0;

    let consecutivo = 0;
    
    let formValue;
    let body;

    const dates = new Date();
    let dateString, hour;
    dateString =
      dates.getFullYear() +
      "-" +
      this.appendLeadingZeroes(dates.getMonth() + 1) +
      "-" +
      this.appendLeadingZeroes(dates.getDate());
    hour =
      dates.getHours() + ":" + dates.getMinutes() + ":" + dates.getSeconds();
    formValue = this._formEntity.value;

    console.log('formValue', formValue);
    

    let ventas;
    ventas = false;
    if(!this.generalSale.paymentType){
      alert('Indica el metodo de pago');
      return null
    }
    if (this.arraySelectPlan.length > 0 || this.arraySelect.length > 0) {
      if (this.barcodes.length > 0) {
        // ************************** get last consecutivo
        const foundUser = this.sellers.find(u => u.user === this._formEntity.value.seller);

        let consecutivoUltimo = 179;
        await this._GeneralServiceService.getLastFactura('sales').subscribe(consecutivo => {

           
            consecutivoUltimo = consecutivo + 1;
            
            //****** VENTA */
            if(this.generalSale.paymentType === 'credit'){
              if(this.vaucher === null || this.vaucher === '' || formValue.name === null || formValue.name === ''){
                alert('Indica un codigo de vaucher y/o nombre de cliente')
                return false
              }
            }
         
            // id of sale general
            const saleIdentifier = uuidv4();
            // set object for creted general sale
    
    
            this.generalSale = {
              ...this.generalSale,
              clientName: this._formEntity.value.name,
              clientNumber: this._formEntity.value.numeroCliente,
              clientEmail: this._formEntity.value.emailCliente,
              sellerName: this._formEntity.value.seller,
              comisionista: this._formEntity.value.comisionista,
              total: (this.totalValue + this.total) * this.barcodes.length,
              idGenerated: saleIdentifier,
              date: dateString,
              clientIdentification: this._formEntity.value.dni,
              consecutivo: consecutivoUltimo,
              zona: foundUser.zone
            };
    
       
            /* for push in firebase*/
            this.barcodes.forEach((element) => {
              ventas = true;
              console.log("code foreac", element.code);
    
              if (element.code !== null) {
                let total;
    
                total = (this.totalValue + this.total) * this.barcodes.length;
                formValue.codebar = "" + element.code;
    
                if (this.generalSale.paymentType === "mixed") {
                  if (this.generalSale.card > 0 && this.generalSale.cash > 0) {
                    let totaltmp;
                    totaltmp = this.generalSale.card + this.generalSale.cash;
                    if (totaltmp !== total) {
                      alert(
                        "Los valores indicados no suman el total de la factura."
                      );
                      ventas = false;
                      return null;
                    }
                  } else {
                    alert("Efectivo y valor en tarjeta no puedes ser menor que 0");
                    ventas = false;
                    return null;
                  }
                }
                if (this.generalSale.paymentType === "cash") {
                  this.generalSale.card = 0;
                  this.generalSale.cash = total;
                }
                if (this.generalSale.paymentType === "card") {
                  this.generalSale.cash = 0;
                  this.generalSale.card = total;
                }
                let totalComision = 0;
    
                this.arraySelect.forEach(element => {
                   
                  if(element.comision_value > 0){
                    totalComision = totalComision + element.comision_value;
                  }
                });
    
                this.arraySelectPlan.forEach(element => {
                  element.services.forEach(element => {
                    if(element.comision_value > 0){
                      totalComision = totalComision + element.comision_value;
                    }  
                  });
                 
                });
                body = {
                  ...formValue,
                  plans: this.arraySelectPlan,
                  detail: this.arraySelect,
                  date: dateString,
                  hour: hour,
                  total: total,
                  state: "Activo",
                  efecty: this.generalSale.cash || null,
                  tarjeta: this.generalSale.card || null,
                  typepay: this.generalSale.paymentType || null,
                  zone: "Oficina",
                  vaucher: this.vaucher,
                  totalComison: totalComision,
                  idGeneralSale: saleIdentifier,
                  timeStamp: new Date().getTime(),
                  consecutivo: consecutivoUltimo,
                };
                if (ventas) {
               
     
                      this.save(body);
                      this.code = "";
                   
    
                  // this.save(body);
                  // this.code = "";
                }
    
                console.log("body", body);
    
                //FIN guardar
              } else {
                alert("Campos obligatorios, Debe indicar un código de barra");
                return null;
              }
            });
    
            if (ventas) {
              const sale = this._GeneralServiceService.createFirebase(
                "generalSale",
                this.generalSale
              );
              console.log(sale);
              sale.then((result) => {
                this._GeneralServiceService
                  .getById("generalSale", result.id)
                  .then((datas) => {
                    const generalSale = datas.data();
                    this._GeneralServiceService
                      .getSaleByIdGenerated(
                        "sales",
                        "idGeneralSale",
                        generalSale.idGenerated
                      )
                      .subscribe((res) => {
                        const list = res.map((data) => data.payload.doc.data());
                        console.log(list);
                        if(impresiones == 0){
                          this.ticke.pdf(generalSale, list, consecutivoUltimo);
                          impresiones = impresiones + 1;

                        }
                      });
                  });
              });
              //****************** Enviar WhatsApp **************************
              //*********************************************************** */
    
              //1. Registrar cliente en la base de datos whatsapp
              let cliente: clientWhastapp = { 
                clientName: formValue.name, 
                clientNumber: formValue.numeroCliente, 
                clientEmail: formValue.emailCliente, 
                clientIdentification: formValue.dni, 
                date: dateString,
                consentimiento: "PENDIENTE"
                
              };
              if(cliente.clientNumber != "" && cliente.clientName != ""){
                this._GeneralServiceService.createFirebase("ClientesWhatsapp", cliente);
                //2. Enviar mensaje de WhatsApp
                this.sendMessage(this._formEntity.value.numeroCliente);
              }
              
              // ******************** Fin enviar whastapp *********************
    
              
              alert("Venta creada. Su venta a sido registrada");
              // this.receipt = true;
              let total;
              total = this.total + this.totalValue;
              this.dataFormvalue = {
                ...this._formEntity.value,
                codes: this.barcodes,
                plans: this.arraySelectPlan,
                detail: this.arraySelect,
                date: dateString,
                total: total,
                state: "Activo",
              };
              this.generalSale = {};
              this.total = 0;
              this.totalValue = 0;
              this.arraySelectPlan = [];
              this.arraySelect = [];
              this.barcodes = [];
              this.vaucher = "";
              this._formEntity.reset();
              this.initFomr();
              this.showmixprice = false;
            }

            console.log('Consecutivo: ', consecutivo);
          }, error => {
            console.error('Error al obtener el consecutivo:', error);
          });

      } else {
        alert("Campos obligatorios, Debe indicar un código de barra");
        return null;
      }
    } else {
      alert(
        "Campos obligatorios. Seleccione por lo menos un plan o un servicio a la venta"
      );
      return null;
    }
    
  }

  async save(body) {
    await this._GeneralServiceService
      .createFirebase("sales", body)
      .catch((error) => console.error(error));
  }

  getSellers() {
    this._GeneralServiceService.getSeller().subscribe((data) => {
      this.sellers = data.map((e) => {
        console.log("users", e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as any;
      });
      //Configruar autocompleta
       // Configurar el autocompletado una vez que los datos estén cargados
        this.filteredOptions = this._formEntity.get('name').valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
  }

  getAgencias() {
    this._GeneralServiceService.getFirebase('agency').subscribe(
      data => {
        // console.log('dara', data);
        this.agencias = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as any;
        });
        this.arryTMPagencias = this.agencias;
      });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.sellers.filter(seller => 
      seller.user.toLowerCase().includes(filterValue)
    );
  }

  displayFn(seller: any): string {
    return seller && seller.user ? seller.user : '';
  }
  getDataComisionitas() {
    this._GeneralServiceService.getFirebase('commissions').subscribe(
      data => {
        // console.log('dara', data);
        this.datac = data.map(e => {
          // console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Commission;
        });
      });
  }
  /**
   * name: "asdasd"
   dni: "asdas2"
   seller: "Jeffer ee"
   codebar: "3333333333333"
   dicount: ""
   service: ""
   plans: Array(1)
   0: {agency: "royal Cari 2", description: "asd", discount: 0, name: "PLAN TAYRONA", selectedDoor: "Ny3YhagmLOoNNdfIbfs0", …}
   length: 1
   __proto__: Array(0)
   detail: Array(0)
   length: 0
   __proto__: Array(0)
   date: "Mon, 30 Dec 2019 21:05:35 GMT"
   total: 13000
   state: "Activo"
   */
}

export interface GeneralSale {
  clientName?: string;
  clientNumber?: string;
  clientEmail?: string;
  clientIdentification?: string;
  sellerName?: string;
  paymentType?: "card" | "credit" | "cash" | "mixed";
  card?: number;
  cash?: number;
  idGenerated?: string;
  id?: string;
  total?: number;
  date?: Date;
  comisionista?:string;
  zona?:string;
  consecutivo?:number;
}

export interface clientWhastapp {
  clientName?: string;
  clientNumber?: string;
  clientEmail?: string;
  clientIdentification?: string;
  date?: string;
  servicios?: any;
  consentimiento?: "SI" | "NO" | "PENDIENTE";

}

export enum paymentType {
  "card",
  "credit",
  "cash",
  "mixed",
}
