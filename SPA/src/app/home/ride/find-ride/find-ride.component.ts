import { Component, OnInit } from '@angular/core';
import {AlertifyService, AuthService, RideService} from '../../../shared/services';
import {Pagination, Ride} from '../../../shared/models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-find-ride',
  templateUrl: './find-ride.component.html',
  styleUrls: ['./find-ride.component.css']
})
export class FindRideComponent implements OnInit {

  rides: Ride[];
  rideParams: any = {};
  pagination: Pagination;

  constructor(private rideService: RideService, private route: ActivatedRoute,
              private authService: AuthService, private  alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.rides = data.ride.result;
      this.pagination = data.ride.pagination;
    });
    this.loadRides();
  }

  loadRides() {
    this.rideService.getRides(this.authService.decodedToken.nameid,
      this.pagination.currentPage, this.pagination.itemsPerPage, this.rideParams)
      .subscribe(response => {
        this.rides = response.result;
        this.pagination = response.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadRides();
  }
}
