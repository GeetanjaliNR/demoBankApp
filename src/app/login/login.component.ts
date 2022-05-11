import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  aim = 'Your Perfect Banking Partner';
  accNum = 'Account Number Please!!';
  // acno = '';
  // pswd = '';

  //database
  // database: any = {
  //   1000: { acno: 1000, uname: 'Neer', password: 1000, balance: 5000 },
  //   1001: { acno: 1001, uname: 'Laisha', password: 1001, balance: 3000 },
  //   1002: { acno: 1002, uname: 'Vyom', password: 1002, balance: 4000 },
  // };

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });

  constructor(
    private router: Router,
    private db: DataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  // event binding using $event
  // acnoChange(event: any) {
  //   this.acno = event.target.value;
  //   console.log(this.acno);
  // }
  // pswdChange(event: any) {
  //   this.pswd = event.target.value;
  //   console.log(this.pswd);
  // }

  //login using event binding $event
  // modifying login using dependency injection

  login() {
    var acno = this.loginForm.value.acno;
    var pswd = this.loginForm.value.pswd;

    if (this.loginForm.valid) {
      this.db.login(acno, pswd).subscribe(
        (result: any) => {
          //storing username, acno and token into localstorage
          if (result) {
            localStorage.setItem(
              'currentAcno',
              JSON.stringify(result.currentAcno)
            );
            localStorage.setItem(
              'currentUser',
              JSON.stringify(result.currentUser)
            );
            localStorage.setItem('token', JSON.stringify(result.token));
            alert('Login successful!!');
            this.router.navigateByUrl('dashboard');
          }
        },
        (result: any) => {
          alert(result.error.message);
        }
      );
    } else {
      alert('invalid form');
    }
  }

  // login using Template referencing variable
  // login(a: any, p: any) {
  //   var acno = a.value;
  //   var pswd = p.value;

  //   let database = this.database;

  //   if (acno in database) {
  //     if (pswd == database[acno]['password']) {
  //       alert('Login successful!!');
  //     } else {
  //       alert('Invalid Password!!');
  //     }
  //   } else {
  //     alert('Account number does not exist!');
  //   }
  // }
}
