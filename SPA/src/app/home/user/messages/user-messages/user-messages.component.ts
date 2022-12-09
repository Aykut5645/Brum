import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../../../shared/models';
import {AlertifyService, AuthService, UserService} from '../../../../shared/services';
import {takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit, OnDestroy {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  private ngUnsubscribe$ = new Subject();
  constructor(private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(messages => {
          for (let i = 0; i < messages.length; i++) {
            if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
              this.userService.markAsRead(currentUserId, messages[i].id);
            }
          }
        }),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(messages => {
      this.messages = messages;
    }, error => {
        this.alertify.error(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((message: Message) => {
    this.messages.unshift(message);
    this.newMessage = {};
    }, error => {
      this.alertify.error(error);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


}
