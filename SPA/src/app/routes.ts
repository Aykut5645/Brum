import { HomeComponent } from './home/home.component';


import { UserComponent } from './home/user/user.component';
import { UserListComponent } from './home/user/user-list/user-list.component';
import { OfferRideComponent } from './home/ride/offer-ride/offer-ride.component';
import { FindRideComponent } from './home/ride/find-ride/find-ride.component';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { LoginComponent } from './shared/components/auth/login/login.component';
import {UserResolver, ListsResolver, MessagesResolver} from './shared/resolvers';
import {UserListResolver} from './shared/resolvers';
import {AuthGuard} from './shared/guards';
import {UserEditComponent} from './home/user/user-edit/user-edit.component';
import {UserEditResolver} from './shared/resolvers';
import {RunGuardsAndResolvers} from '@angular/router';
import {PreventUnsavedChangesGuard} from './shared/guards';
import { ListsComponent } from './home/user/lists/lists.component';
import {MessagesComponent} from './home/user/messages/messages.component';
import {AdminPanelComponent} from './admin/admin-panel/admin-panel.component';
import {UserRidesComponent} from './home/ride/user-rides/user-rides.component';
import {RideListResolver} from './shared/resolvers';


export const appRoutes = [
    { path: 'home', component: HomeComponent},
    { path: '', component: HomeComponent},
    {
      path: '',
      runGuardsAndResolvers: 'always' as RunGuardsAndResolvers,
      canActivate: [AuthGuard],
      children: [
        // { path: '', component: HomeComponent},
        { path: 'users', component: UserListComponent, resolve: {users: UserListResolver} },
        { path: 'users/:id', component: UserComponent, resolve: {user: UserResolver}},
        { path: 'user/edit', component: UserEditComponent, resolve: {user: UserEditResolver}, canDeactivate: [PreventUnsavedChangesGuard] },
        { path: 'find-ride', component: FindRideComponent, resolve: {ride: RideListResolver}},
        { path: 'offer-ride', component: OfferRideComponent},
        { path: 'user-rides', component: UserRidesComponent},
        { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
        { path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
        { path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Moderator']}},
      ]
    },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];
//   { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},

    // {
    //     path: '',
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [AuthGuard],
    //     children: [
    //         { path: 'login', component: RegisterComponent},
    //         { path: 'register', component: RegisterComponent},
    //     ]
    // },
