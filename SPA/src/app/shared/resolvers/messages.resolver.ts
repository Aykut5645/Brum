import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/users/user.service';
import {AlertifyService} from '../services/alertify/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Message} from '../models';
import {AuthService} from '../services';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';
  constructor(private userService: UserService, private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data.');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
