import {UserForRide} from './user-for-ride';


export interface Ride {
  id: number;
  driver: UserForRide;
  totalSeats: number;
  date: Date;
  startPoint: string;
  endPoint: string;
  requestedPassengers: Array<UserForRide>;
  approvedPassengers: Array<UserForRide>;
  rejectedPassengers: Array<UserForRide>;
}
