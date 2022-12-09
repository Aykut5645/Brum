import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/users/user.service';
import {AlertifyService} from '../services/alertify/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser(route.params.id).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data.');
        this.router.navigate(['/users']);
        return of(null);
      })
    );
  }
}
