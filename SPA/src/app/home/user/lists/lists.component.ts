import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginatedResult, Pagination, User} from '../../../shared/models';
import {AlertifyService, AuthService, UserService} from '../../../shared/services';
import {ActivatedRoute} from '@angular/router';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, OnDestroy {
  users: User[];
  pagination: Pagination;
  likesParam: string;
  private ngUnsubscribe$ = new Subject();
  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });

    this.likesParam = 'Likers';
  }
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
