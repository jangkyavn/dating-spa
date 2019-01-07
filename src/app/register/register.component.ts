import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model)
      .subscribe(_ => {
        console.log('Đăng ký thành công');
      }, error => console.log(error));
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
