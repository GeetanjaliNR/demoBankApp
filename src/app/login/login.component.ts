import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  aim = 'Your Perfect Banking Partner';
  accNum = 'Account Number Please!!';
  acno = '';
  pswd = '';

  //database
  database = {
    1000: { acno: 1000, uname: 'Neer', password: 1000, balance: 5000 },
    1001: { acno: 1001, uname: 'Laisha', password: 1001, balance: 3000 },
    1002: { acno: 1002, uname: 'Vyom', password: 1002, balance: 4000 },
  };

  constructor() {}

  ngOnInit(): void {}

  acnoChange(event: any) {
    this.acno = event.target.value;
    console.log(this.acno);
  }

  pswdChange(event: any) {
    this.pswd = event.target.value;
    console.log(this.pswd);
  }

  login() {
    alert('Login clicked!');
  }
}
