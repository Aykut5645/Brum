import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/users/user.service';
import {AlertifyService} from '../services/alertify/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';

@Injectable()
export class UserEditResolver implements Resolve<User> {
  constructor(private userService: UserService, private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving your data.');
        this.router.navigate(['/users']);
        return of(null);
      })
    );
  }
}
