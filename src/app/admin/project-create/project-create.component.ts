import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  constructor(private _GeneralServiceService: GeneralServiceService) { }

  ngOnInit() {
  }

  ce() {
    console.log('ce');

    let u: User;
    u = {
      name: 'Jeff',
      dni: '1041',
      email: 'je@gas.ckk',
      onesignal: '054656156',
      password: '062891',
      phone: '3340635',
      type: 'normal',
      user: 'jariza'
    };
    this._GeneralServiceService.createFirebase('users', u);
  }

}
