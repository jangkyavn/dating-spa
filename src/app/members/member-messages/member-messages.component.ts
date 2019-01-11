import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Message } from '../../shared/models/message';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { AlertifyService } from '../../shared/services/alertify.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private authSerivce: AuthService,
    private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authSerivce.decodedToken.nameid;
    this.userService.getMessageThread(this.authSerivce.decodedToken.nameid, this.recipientId)
      .pipe(
        tap((response: Message[]) => {
          for (let i = 0; i < response.length; i++) {
            if (response[i].isRead === false && response[i].recipientId === currentUserId) {
              this.userService.markAsRead(currentUserId, response[i].id);
            }
          }
        })
      )
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        console.log(this.messages);
      }, error => {
        this.alertify.error('Có lỗi xảy ra');
        console.log(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;

    this.userService.sendMessage(this.authSerivce.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
        this.messages.unshift(message);
        this.newMessage.content = '';
      }, error => {
        this.alertify.error('Có lỗi xảy ra');
        console.log(error);
      });
  }
}
