import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Ride} from '../../models';
import {Observable} from 'rxjs';
import {PaginatedResult, User} from '../../models';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RideService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createRide( ride: Ride) {
    return this.http.post(this.baseUrl + 'users/' + ride.driver.id + '/rides/', ride);
  }

  getRides(userId, page?, itemsPerPage?, rideParams?): Observable<PaginatedResult<Ride[]>> {
    const paginatedResult: PaginatedResult<Ride[]> = new PaginatedResult<Ride[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (rideParams != null) {
      if (rideParams.startPoint) {
        params = params.append('startPoint', rideParams.startPoint);
      }
      if (rideParams.endPoint) {
        params = params.append('endPoint', rideParams.endPoint);
      }
      if (rideParams.date) {
        params = params.append('date', rideParams.date);
      }
      if (rideParams.freeSeats) {
        params = params.append('freeSeats', rideParams.freeSeats);
      }

      if (rideParams.asPassenger) {
        params = params.append('asPassenger', 'true');
      }
      if (rideParams.asDriver) {
        params = params.append('asDriver', 'true');
      }
    }



    return this.http.get<Ride[]>(this.baseUrl + 'users/' + userId + '/rides',
      {observe: 'response', params})
      .pipe(
        map( response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
          })
      );
  }
}
