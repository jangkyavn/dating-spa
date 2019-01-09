import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { AlertifyService } from '../shared/services/alertify.service';
import { Router } from '@angular/router';

function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return { year: toInteger(dateParts[0]), month: null, day: null };
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return { year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null };
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return { year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0]) };
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    let stringDate: any = '';
    if (date) {
      stringDate += isNumber(date.day) ? padNumber(date.day) + '/' : '';
      stringDate += isNumber(date.month) ? padNumber(date.month) + '/' : '';
      stringDate += date.year;
    }
    return stringDate;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  user: User;
  registerForm: FormGroup;
  invalidDate = false;
  minDate = {year: new Date().getFullYear() - 50, month: 1, day: 1};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private parserFormatter: NgbDateParserFormatter,
    private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.passwordMatchValidator
      ]],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.registerForm.valueChanges.subscribe(() => {
      if (this.registerForm.controls['dateOfBirth'].value !== '') {
        this.invalidDate = false;
      }
    });
  }

  passwordMatchValidator(c: AbstractControl) {
    if (!c.parent || !c) {
      return;
    }
    const pwd = c.parent.get('password');
    const cpwd = c.parent.get('confirmPassword');

    if (!pwd || !cpwd) {
      return;
    }
    if (pwd.value !== cpwd.value) {
      return { notsame: true };
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      const { day, month, year } = this.registerForm.get('dateOfBirth').value;
      this.user.dateOfBirth = new Date(month + '/' + day + '/' + year);
      this.authService.register(this.user).subscribe(_ => {
        this.alertify.success('Đăng ký thành công');
      }, error => {
        this.alertify.error('Có lỗi xảy ra');
        console.log(error);
      }, () => {
        this.authService.login(this.user).subscribe(_ => {
          this.router.navigate(['/members']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  onBlurDateOfBirth(error: any) {
    this.invalidDate = error;
  }
}
