import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AlertifyService } from '../../services/alertify/alertify.service';
import { Router } from '@angular/router';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  photoUrl: string;
  private ngUnsubscribe$ = new Subject();
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  roleMatch() {
    return this.authService.roleMatch(['Admin', 'Moderator']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
