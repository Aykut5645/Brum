import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';

import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {AlertifyService} from '../../../services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {User} from '../../../models/user';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  private ngUnsubscribe$ = new Subject();
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
          this.router.navigate(['/users']);
        });
      });
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
