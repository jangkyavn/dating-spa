import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { AlertifyService } from '../shared/services/alertify.service';

import { Message } from '../shared/models/message';
import { Pagination, PaginatedResult } from '../shared/models/pagination';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });

    this.messageContainer = 'Unread';
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error.error);
        console.log(error);
      });
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Bạn có chắc chắn muốn xóa tin nhắn này không?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid)
        .subscribe(_ => {
          this.messages.splice(this.messages.findIndex(x => x.id === id), 1);
          this.alertify.success('Xóa tin nhắn thành công');
        }, error => {
          this.alertify.error('Có lỗi xảy ra');
          console.log(error);
        });
    });
  }
}
