import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService, AlertifyService} from '../../shared/services';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit, OnDestroy {
  photos: any;
  private ngUnsubscribe$ = new Subject();
  constructor(private adminService: AdminService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((photos) => {
      this.photos = photos;
    }, error => {
      this.alertify.error(error);
    });
  }

  approvePhoto(photoId) {
    this.adminService.approvePhoto(photoId).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, error => {
      this.alertify.error(error);
    });
  }

  rejectPhoto(photoId) {
    this.adminService.rejectPhoto(photoId).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, error => {
      this.alertify.error(error);
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
