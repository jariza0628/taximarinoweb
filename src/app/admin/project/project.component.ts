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
        link: 'create',
        icon: 'fa fa-dashboard fa-lg'
      },
      {
        name: 'Servicios individuales',
        link: 'create',
        icon: 'fa fa-dashboard fa-lg'
      },
      {
        name: 'Ventas',
        link: 'create',
        icon: 'fa fa-dashboard fa-lg'
      },
      {
        name: 'Zonas',
        link: 'create',
        icon: 'fa fa-dashboard fa-lg'
      },
      {
        name: 'Ajencias',
        link: 'create',
        icon: 'fa fa-dashboard fa-lg'
      },
    ];
  }

  ngOnInit() {

  }

}


