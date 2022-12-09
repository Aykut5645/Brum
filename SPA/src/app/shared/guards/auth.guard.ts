import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AlertifyService } from '../services/alertify/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {

    const roles = next.firstChild.data.roles as Array<string>;
    if(roles) {
      const match = this.authService.roleMatch(roles);
      if(match) {
        return true;
      } else {
        this.router.navigate(['users']);
        this.alertify.error('You are not authorized to access this area.');
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('You do not have the rights to enter this page.');
    this.router.navigate(['/home']);
    return false;
  }
}
