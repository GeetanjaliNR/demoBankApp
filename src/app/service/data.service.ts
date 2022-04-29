import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  currentUser: any;
  currentAcno: any;
  //database
  database: any = {
    1000: {
      acno: 1000,
      uname: 'Neer',
      password: 1000,
      balance: 5000,
      transaction: [],
    },
    1001: {
      acno: 1001,
      uname: 'Laisha',
      password: 1001,
      balance: 3000,
      transaction: [],
    },
    1002: {
      acno: 1002,
      uname: 'Vyom',
      password: 1002,
      balance: 4000,
      transaction: [],
    },
  };
  constructor() {
    this.getDetails();
  }

  // to save values in localStorage
  saveDetails() {
    localStorage.setItem('database', JSON.stringify(this.database));

    if (this.currentAcno) {
      localStorage.setItem('currentAcno', JSON.stringify(this.currentAcno));
    }
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }

  //get details from Local storage
  getDetails() {
    if (localStorage.getItem('database')) {
      this.database = JSON.parse(localStorage.getItem('database') || '');
    }
    if (localStorage.getItem('currentAcno')) {
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '');
    }
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    }
  }

  // register
  register(uname: any, acno: any, password: any) {
    let database = this.database;

    if (acno in database) {
      //user already exists
      return false;
    } else {
      //creating new user
      database[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction: [],
      };
      console.log(database);
      this.saveDetails();
      return true;
    }
  }

  // login
  login(acno: any, pswd: any) {
    let database = this.database;

    if (acno in database) {
      if (pswd == database[acno]['password']) {
        this.currentUser = database[acno]['uname'];
        this.currentAcno = acno;
        this.saveDetails();
        return true;
      } else {
        alert('Invalid Password!!');
        return false;
      }
    } else {
      alert('Account number does not exist!');
      return false;
    }
  }

  // deposit
  deposit(acno: any, pswd: any, amt: any) {
    var amount = parseInt(amt);
    let database = this.database;

    if (acno in database) {
      if (pswd == database[acno]['password']) {
        database[acno]['balance'] += amount;
        database[acno]['transaction'].push({
          type: 'Credit',
          amount: amount,
        });
        console.log(database);
        this.saveDetails();

        return database[acno]['balance'];
      } else {
        alert('Invalid Password!!');
        return false;
      }
    } else {
      alert('Account number does not exist!');
      return false;
    }
  }

  // withdraw
  withdraw(acno: any, pswd: any, amt: any) {
    var amount = parseInt(amt);
    let database = this.database;

    if (acno in database) {
      if (pswd == database[acno]['password']) {
        if (database[acno]['balance'] > amount) {
          database[acno]['balance'] -= amount;
          database[acno]['transaction'].push({
            type: 'Debit',
            amount: amount,
          });
          this.saveDetails();
          return database[acno]['balance'];
        } else {
          alert('Insufficient balance!!');
          return false;
        }
      } else {
        alert('Invalid Password!!');
        return false;
      }
    } else {
      alert('Account number does not exist!');
      return false;
    }
  }

  //transaction
  transaction(acno: any) {
    return this.database[acno]['transaction'];
  }
}
