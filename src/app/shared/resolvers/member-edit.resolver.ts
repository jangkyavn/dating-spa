import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';

import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MemberEditResolver implements Resolve<User> {
    constructor(
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
        private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(_ => {
                this.alertify.error('Có lỗi xảy ra');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
