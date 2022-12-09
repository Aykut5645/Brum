import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../shared/models';
import {UserService} from '../../shared/services';
import {AlertifyService} from '../../shared/services';
import {ActivatedRoute} from '@angular/router';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {TabsetComponent} from 'ngx-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('userTabs', {static: true}) userTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.route.queryParams.subscribe(params => {
      const selectedTab = params.tab;
      this.userTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];

    for(const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  selectTab( tabId: number) {
    this.userTabs.tabs[tabId].active = true;
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params.id).subscribe((user: User) => {
  //     this.user = user;
  //     console.log(this.user);
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
