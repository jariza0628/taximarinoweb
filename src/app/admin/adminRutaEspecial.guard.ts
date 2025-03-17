import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRutaEspecialGuard implements CanActivate {
  usrmail: any;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
// Verifica si el usuario está autenticado y si el email cumple con la condición
this.usrmail = localStorage.getItem("userlog");
 
if (this.authService.isLoggedIn && (this.usrmail === 'jefferariza@outlook.com' || this.usrmail === 'taximarino2020@gmail.com' || this.usrmail === 'canopysistema2020@gmail.com')) {
  return true;
} else {
  return this.router.parseUrl('/admin/new-sales');
}
  }
}
