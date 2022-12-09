import { Component, OnInit } from '@angular/core';
import {Ride} from '../../../shared/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {AlertifyService, AuthService, RideService} from '../../../shared/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css']
})
export class OfferRideComponent implements OnInit {
  ride: Ride;
  rideForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private fb: FormBuilder, private authService: AuthService,
              private rideService: RideService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false
    };
    this.createRideForm();
  }

  createRideForm() {
    this.rideForm = this.fb.group({
      startPoint: ['', Validators.required],
      endPoint: ['', Validators.required],
      date: [null, Validators.required],
      totalSeats: ['', Validators.required],
    });
  }

  createRide() {
    if (this.rideForm.valid) {
      this.ride = Object.assign({}, this.rideForm.value);
      this.ride.driver.id = this.authService.decodedToken.nameid;
      this.rideService.createRide(this.ride).subscribe(() => {
          this.alertify.success('Ride created successfully.');
        }, error => {
          this.alertify.error(error);
        }, () => {
        this.router.navigate(['/home']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
