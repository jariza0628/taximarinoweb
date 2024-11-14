import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  menuOptions: any;
  menuOptionsAcuario: any;
  usrmail: any;
  mail = "jefferariza@outlook.com";
  constructor() {
    this.menuOptions = [
      {
        name: "Users",
        link: "create",
        rol: "admin",
        icon: "bi bi-caret-right-fill",
      },
      {
        name: "Planes o combos",
        link: "plans",
        rol: "admin",
        icon: "bi bi-wallet-fill",
      },
      {
        name: "Servicios individuales",
        link: "services",

        rol: "admin",
        icon: "bi bi-bell-slash-fill",
      },
      {
        name: "Ventas",
        link: "sales",

        rol: "user",
        icon: "bi bi-wallet-fill",
      },
      {
        name: "Zonas",
        link: "ponitsale",

        rol: "user",
        icon: "bi bi-caret-right-fill",
      },
      {
        name: "Agencia",
        link: "agency",

        rol: "user",
        icon: "bi bi-caret-right-fill",
      },
      {
        name: "Crear Venta",
        link: "new-sales",
        rol: "user",
        icon: "bi bi-coin",
      },
      {
        name: "Buscar Código (Venta)",
        link: "codebar",
        rol: "user",
        icon: "bi bi-search",
      },
      {
        name: "Informes",
        link: "reports",
        rol: "admin",
        icon: "bi bi-caret-right-fill",
      },
      {
        name: "Historico",
        link: "history",
        rol: "admin",
        icon: "bi bi-clock-history",
      },
      {
        name: "Inventario Manilla",
        link: "inventory",
        rol: "admin",
        icon: "bi bi-receipt",
      },
      {
        name: "Reportes Diarios",
        link: "bi bi-bar-chart-fill",
        rol: "user",
        icon: "bi bi-wallet-fill",
      },
      {
        name: "Reportes Diarios Comision",
        link: "reportscomision",
        rol: "user",
        icon: "bi bi-cash-coin",
      },
      {
        name: "Comisionistas",
        link: "comision",
        rol: "user",
        icon: "bi bi-wallet-fill",
      },
      {
        name: "Cod. Sin resultados (App Verficador)",
        link: "codebarnovelty",
        rol: "user",
        icon: "bi bi-wallet-fill",
      },
      {
        name: "Informe Lanchas",
        link: "boat",
        rol: "user",
        icon: "bi bi-truck-flatbed",
      },
      {
        name: "Cierres",
        link: "close",
        rol: "user",
        icon: "bi bi-door-closed",
      },
      {
        name: "Comisiones",
        link: "comisionslog",
        rol: "user",
        icon: "bi bi-wallet-fill",
      },
      {
        name: "Clientes Whatsapp",
        link: "clienteswhatsapp",
        rol: "user",
        icon: "bi bi-whatsapp",
      },
     
    ];


    this.menuOptionsAcuario = [
      
      {
        name: "Crear Venta",
        link: "new-sales",
        rol: "user",
        icon: "bi bi-coin",
      },
       
      {
        name: "Reportes Diarios",
        link: "daily-reports",
        rol: "user",
        icon: "bi bi-bar-chart-fill",
      },
      {
        name: "Buscar Código (Venta)",
        link: "codebar",
        rol: "user",
        icon: "bi bi-search",
      },
    ];
  }

  ngOnInit() {
    this.usrmail = localStorage.getItem("userlog");
    if (this.usrmail == 'sistemaacuarioaudiovisual@gmail.com' || this.usrmail == 'ccajacanopy@gmail.com' 
      || this.usrmail == 'cajaactividadacuario@gmail.com' || this.usrmail == 'audiovisualcaja@gmail.com' || this.usrmail == 'cajataquillaacuario@gmail.com') {
      this.menuOptions = this.menuOptionsAcuario;
    }
  }
}
