import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {JwtModule} from '@auth0/angular-jwt';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import {FileUploadModule} from 'ng2-file-upload';
import {MatTabsModule} from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { UserComponent } from './home/user/user.component';
import { UserListComponent } from './home/user/user-list/user-list.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { OfferRideComponent } from './home/ride/offer-ride/offer-ride.component';
import { FindRideComponent } from './home/ride/find-ride/find-ride.component';
import { UserCardComponent } from './home/user/user-list/user-card/user-card.component';
import { UserEditComponent } from './home/user/user-edit/user-edit.component';
import { PhotoEditComponent } from './home/user/photo-edit/photo-edit.component';
import {SharedModule} from './shared/shared.module';
import {BsDropdownModule, TabsModule, PaginationModule, ButtonsModule} from 'ngx-bootstrap';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ModalModule } from 'ngx-bootstrap/modal';
import {BsDatepickerModule, BsLocaleService} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { bgLocale } from 'ngx-bootstrap/locale';
defineLocale('bg', bgLocale);
import { ListsComponent } from './home/user/lists/lists.component';
import { MessagesComponent } from './home/user/messages/messages.component';
import { UserMessagesComponent } from './home/user/messages/user-messages/user-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './admin/user-management/roles-modal/roles-modal.component';
import {RideCardComponent} from './home/ride/find-ride/ride-card/ride-card.component';
import { UserRidesComponent } from './home/ride/user-rides/user-rides.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
export function tokenGetter() {
  return localStorage.getItem('token');
}
@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: {enable: false}
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    OfferRideComponent,
    FindRideComponent,
    UserComponent,
    UserListComponent,
    UserCardComponent,
    UserEditComponent,
    PhotoEditComponent,
    ListsComponent,
    MessagesComponent,
    UserMessagesComponent,
    AdminPanelComponent,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    RideCardComponent,
    UserRidesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    FileUploadModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    RatingModule.forRoot(),
    MatTabsModule,
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    TabsModule,
    BsDatepickerModule
  ],
   providers: [
     {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig}
   ],
  entryComponents: [
    RolesModalComponent
  ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
  constructor( private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('bg');
  }
 }
