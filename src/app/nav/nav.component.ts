import { Component, OnInit } from '@angular/core';

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
    public authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() { }

  login() {
    this.authService.login(this.model)
      .subscribe(_ => this.alertify.success('Đăng nhập thành công')
        , _ => console.log('Đăng nhập thất bại'));
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.model = {};
    console.log('Đã đăng xuất');
  }
}
