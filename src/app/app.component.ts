import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  values: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http
      .get('https://localhost:44361/api/values')
      .subscribe(res => {
        console.log(res);
        this.values = res;
      });
  }
}
