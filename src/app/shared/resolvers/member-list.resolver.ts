import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';

import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class MemberListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(_ => {
                this.alertify.error('Có lỗi xảy ra');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
