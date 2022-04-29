import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  // acno = '';
  // pswd = '';
  // amount = '';

  // acno1 = '';
  // pswd1 = '';
  // amount1 = '';

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  });

  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  });

  loginDate: any;
  acno: any;

  constructor(
    private db: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.user = this.db.currentUser;
    this.loginDate = new Date();
  }

  ngOnInit(): void {
    if (!localStorage.getItem('currentAcno')) {
      alert('Session expired!! Please login..');
      this.router.navigateByUrl('');
    }
  }

  deposit() {
    let acno = this.depositForm.value.acno;
    let pswd = this.depositForm.value.pswd;
    let amount = this.depositForm.value.amount;

    if (this.depositForm.valid) {
      let result = this.db.deposit(acno, pswd, amount);
      if (result) {
        alert(amount + ' successfully deposited. current balance is ' + result);
      }
    } else {
      alert('deposit form invalid!!');
    }
  }

  withdraw() {
    // alert('withdraw clicked!');
    let acno = this.withdrawForm.value.acno1;
    let pswd = this.withdrawForm.value.pswd1;
    let amount = this.withdrawForm.value.amount1;

    if (this.withdrawForm.valid) {
      let result = this.db.withdraw(acno, pswd, amount);
      if (result) {
        alert(amount + ' successfully debited. current balance is ' + result);
      }
    } else {
      alert('withdraw form invalid!!');
    }
  }

  //deleteFromParent()
  deleteFromParent() {
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '');
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAcno');
    this.router.navigateByUrl('');
  }

  //onCancel()
  onCancel() {
    this.acno = '';
  }

  //onDelete
  onDelete(event: any) {
    alert('deleting the Account ' + event);
  }
}
