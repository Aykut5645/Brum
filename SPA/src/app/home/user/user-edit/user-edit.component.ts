import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../shared/models';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from '../../../shared/services';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../shared/services';
import {AuthService} from '../../../shared/services';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  user: User;
  photoUrl: string;
  private ngUnsubscribe$ = new Subject();

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(data => {
      this.user = data.user;
    });
    this.authService.currentPhotoUrl.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(next => {
      this.alertify.success('Profile updated.');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });

  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
