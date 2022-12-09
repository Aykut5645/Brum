import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthGuard, PreventUnsavedChangesGuard} from './guards';
import {TimeAgoExtendsPipe} from './pipes';
import {UserResolver, UserListResolver, UserEditResolver, ListsResolver, RideListResolver} from './resolvers';
import { AuthService, AlertifyService, UserService, ErrorInteceptorProvider, AdminService } from './services';
import {MessagesResolver} from './resolvers';




@NgModule({
  imports: [
    CommonModule,

  ],
  exports: [
    TimeAgoExtendsPipe,

  ],
  declarations: [
    TimeAgoExtendsPipe,

  ],
  providers: [
    AuthService,
    ErrorInteceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    UserResolver,
    UserListResolver,
    UserEditResolver,
    PreventUnsavedChangesGuard,
    ListsResolver,
    MessagesResolver,
    AdminService,
    RideListResolver
  ],
})
export class SharedModule {
}



