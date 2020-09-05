import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  menuOptions: any;
  constructor() {

    this.menuOptions = [
      {
        name: 'Users',
        link: 'create',
        icon: 'fa fa-user fa-lg'
      },
      {
        name: 'Planes o combos',
        link: 'plans',
        icon: 'fa fa-dashboard fa-lg'
      },
      {
        name: 'Servicios individuales',
        link: 'services',
        icon: 'fa fa-dashboard fa-lg'
      },
      {
        name: 'Ventas',
        link: 'sales',
        icon: 'fa fa-dashboard fa-lg'
      },
      {
        name: 'Zonas',
        link: 'ponitsale',
        icon: 'fa fa-dashboard fa-lg'
      },
      {
        name: 'Agencia',
        link: 'agency',
        icon: 'fa fa-dashboard fa-lg'
      },
      {
        name: 'Crear Venta',
        link: 'new-sales',
        icon: 'fa fa-dashboard fa-lg'
      },
      {
        name: 'Informes',
        link: 'reports',
        icon: 'fa fa-dashboard fa-lg'
      },
    ];
  }

  ngOnInit() {

  }

}


