import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Message } from '../models/message';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
        private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer)
            .pipe(
                catchError(_ => {
                    this.alertify.error('Có lỗi xảy ra');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
    }
}
