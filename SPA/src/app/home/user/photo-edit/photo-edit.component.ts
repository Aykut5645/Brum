import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Photo} from '../../../shared/models/photo';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../shared/services';
import {FileUploader} from 'ng2-file-upload';
import {UserService} from '../../../shared/services';
import {AlertifyService} from '../../../shared/services';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit, OnDestroy {
    @Input() photos: Photo[];
    @Output() getMemberPhotoChange = new EventEmitter<string>();
    uploader: FileUploader;
    hasBaseDropZoneOver = false;
    baseUrl = environment.apiUrl;
    currentMain: Photo;
  private ngUnsubscribe$ = new Subject();
    constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) {}

    ngOnInit(): void {
      this.initializeUploader();
    }

    public fileOverBase(e: any) {
      this.hasBaseDropZoneOver = e;
    }

    initializeUploader() {
      this.uploader = new FileUploader({
        url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024
      });
      this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

      this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
          const res: Photo = JSON.parse(response);
          const photo = {
            id: res.id,
            url: res.url,
            dateAdded: res.dateAdded,
            description: res.description,
            isMain: res.isMain,
            isCar: res.isCar,
            isDrivingLicence: res.isDrivingLicence,
            isApproved: res.isApproved
          };
          this.photos.push(photo);
          if (photo.isMain) {
            this.authService.changeMemberPhoto(photo.url);
            this.authService.currentUser.photoUrl = photo.url;
            localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
          }
        }
      };
    }

    setMainPhoto(photo: Photo) {
      this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id ).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
        this.currentMain = this.photos.filter(p => p.isMain === true)[0];
        this.currentMain.isMain = false;
        photo.isMain = true;
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      }, error => {
        this.alertify.error(error);
      });
    }
    deletePhoto(id: number) {
      this.alertify.confirm('Are you sure you want to delete this photo?', () =>
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('Photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo.');
      }));
    }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
