import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  isNavbarCollapsed = true;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  login() {
    this.authService.login(this.model)
      .subscribe(_ => console.log('Đăng nhập thành công')
        , _ => console.log('Đăng nhập thất bại'));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.model = {};
    console.log('Đã đăng xuất');
  }
}
