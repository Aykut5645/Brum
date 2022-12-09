import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message, PaginatedResult, Pagination} from '../../../shared/models';
import {AlertifyService, AuthService, UserService} from '../../../shared/services';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  loading = true;
  private ngUnsubscribe$ = new Subject();

  constructor(private userService: UserService, private  authService: AuthService,
              private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(data => {
      this.loading = false;
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
  }

  loadMessages() {
    this.loading = true;
    this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer).pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.loading = false;
        this.pagination = res.pagination;
    }, error => {
        this.alertify.error(error);
      });
  }

  deleteMessage(id: number) {

    this.alertify.confirm('Are you sure you want to delete this message?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Message has been deleted.');
      }, () => {
        this.alertify.error('Failed to delete the message. Try again later.');
      });
    });
    this.loadMessages();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
