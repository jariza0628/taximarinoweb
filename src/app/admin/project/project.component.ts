import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  menuOptions: any;
  usrmail: any;
  mail = "jefferariza@outlook.com";
  constructor() {
    this.menuOptions = [
      {
        name: "Users",
        link: "create",
        rol: "admin",
        icon: "fa fa-user fa-lg",
      },
      {
        name: "Planes o combos",
        link: "plans",
        rol: "admin",
        icon: "fa fa-dashboard fa-lg",
      },
      {
        name: "Servicios individuales",
        link: "services",

        rol: "admin",
        icon: "fa fa-dashboard fa-lg",
      },
      {
        name: "Ventas",
        link: "sales",

        rol: "user",
        icon: "fa fa-dashboard fa-lg",
      },
      {
        name: "Zonas",
        link: "ponitsale",

        rol: "user",
        icon: "fa fa-dashboard fa-lg",
      },
      {
        name: "Agencia",
        link: "agency",

        rol: "user",
        icon: "fa fa-dashboard fa-lg",
      },
      {
        name: "Crear Venta",
        link: "new-sales",
        rol: "user",
        icon: "fa fa-dashboard fa-lg",
      },
      {
        name: "Informes",
        link: "reports",
        rol: "admin",
        icon: "fa fa-dashboard fa-lg",
      },
      {
        name: "Historico",
        link: "history",
        rol: "admin",
        icon: "fa fa-dashboard fa-lg",
      },
      {
        name: "Inventario Manilla",
        link: "inventory",
        rol: "admin",
        icon: "fa fa-dashboard fa-lg",
      },
      {
        name: "Reportes Diarios",
        link: "daily-reports",
        rol: "user",
        icon: "fa fa-bell",
      },
      {
        name: "Comisionistas",
        link: "comision",
        rol: "user",
        icon: "fa fa-bell",
      },
      {
        name: "Cod. Sin resultados (App Verficador)",
        link: "codebarnovelty",
        rol: "user",
        icon: "fa fa-bell",
      },
      {
        name: "Informe Lanchas",
        link: "boat",
        rol: "user",
        icon: "fa fa-bell",
      },
    ];
  }

  ngOnInit() {
    this.usrmail = localStorage.getItem("userlog");
  }
}
