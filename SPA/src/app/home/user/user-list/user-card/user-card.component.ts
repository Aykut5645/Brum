import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../shared/models';
import {AlertifyService, AuthService, UserService} from '../../../../shared/services';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit, OnDestroy {
  @Input() user: User;
  private ngUnsubscribe$ = new Subject();
  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.alertify.success('You have liked: ' + this.user.name);
    }, error => {
      this.alertify.error(error);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
