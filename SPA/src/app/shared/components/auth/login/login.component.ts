import {Component, OnDestroy, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {AlertifyService} from '../../../services/alertify/alertify.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};
  private ngUnsubscribe$ = new Subject();
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {}

  login() {
    this.authService.login(this.model).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(next => {
      this.alertify.success('Logged in successfully.');

    }, error => {
      this.alertify.error('Failed to login.');
    }, () => {
      this.router.navigate(['/user-list']); // TODO: Change this
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
