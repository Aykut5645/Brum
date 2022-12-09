import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from 'src/app/shared/models';
import { AdminService, AlertifyService } from 'src/app/shared/services';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RolesModalComponent} from './roles-modal/roles-modal.component';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  users: User[];
  bsModalRef: BsModalRef;
  private ngUnsubscribe$ = new Subject();
  constructor(private adminService: AdminService, private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWuthRoles();
  }

  getUsersWuthRoles() {
    this.adminService.getUsersWithRoles().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }

  editRolesModal(user: User) {
    const initialState = {
       user,
        roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((values) => {
      const rolesToUpdate = {
        roleNames: [...values.filter(v => v.checked === true).map(v => v.name)]
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user, rolesToUpdate).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }

  private getRolesArray(user: User) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
      {name: 'VIP', value: 'VIP'}
    ];

    for (let i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      for (let j = 0; j < userRoles.length; j++) {
        if(availableRoles[i].name === userRoles[j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }
    return roles;
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
