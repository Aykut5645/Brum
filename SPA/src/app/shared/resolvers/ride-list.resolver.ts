import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Ride} from "../models";
import {AlertifyService, AuthService, RideService} from "../services";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable()
export class RideListResolver implements Resolve<Ride[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(private rideService: RideService, private  authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ride[]> {
    return this.rideService.getRides(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data.');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
