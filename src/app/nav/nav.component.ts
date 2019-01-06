import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { AlertifyService } from '../shared/services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  isNavbarCollapsed = true;

  constructor(
    private router: Router,
    public authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() { }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Đăng nhập thành công');
    }, _ => {
      this.alertify.error('Tài khoản hoặc mật khẩu không đúng');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.model = {};
    this.router.navigate(['/home']);
  }
}
