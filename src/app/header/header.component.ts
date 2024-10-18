import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imgIcon: String = "../../assets/icon-home.png";
  usrmail: String;

  constructor(public authService: AuthService) { }
  ngOnInit() {
    if(localStorage.getItem("userlog")){
      this.usrmail = localStorage.getItem("userlog");
      console.log(this.usrmail);
      
      if(this.usrmail === 'ccajacanopy@gmail.com'){
        this.imgIcon = '../../assets/CANOPYREDONDO.png';
      }
      if(this.usrmail === 'cajaactividadacuario@gmail.com'){
        this.imgIcon = '../../assets/CENTROVIDAREDONDO.png';
      }
      if(this.usrmail === 'audiovisualcaja@gmail.com'){
        this.imgIcon = '../../assets/CENTROVIDAREDONDO.png';
      }
      if(this.usrmail === 'cajataquillaacuario@gmail.com'){
        this.imgIcon = '../../assets/CENTROVIDAREDONDO.png';
      }

    }else{
      this.imgIcon = "../../assets/icon-home.png";
    }
  }

}
