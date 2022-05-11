import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const options = {
  headers: new HttpHeaders(),
};
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
  constructor(private http: HttpClient) {
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
    const data = {
      uname,
      acno,
      password,
    };

    return this.http.post('http://localhost:3000/register', data);

    // let database = this.database;
    // if (acno in database) {
    //   //user already exists
    //   return false;
    // } else {
    //   //creating new user
    //   database[acno] = {
    //     acno,
    //     uname,
    //     password,
    //     balance: 0,
    //     transaction: [],
    //   };
    //   console.log(database);
    //   this.saveDetails();
    //   return true;
    // }
  }

  // login
  login(acno: any, pswd: any) {
    const data = {
      acno,
      pswd,
    };

    return this.http.post('http://localhost:3000/login', data);

    // let database = this.database;
    // if (acno in database) {
    //   if (pswd == database[acno]['password']) {
    //     this.currentUser = database[acno]['uname'];
    //     this.currentAcno = acno;
    //     this.saveDetails();
    //     return true;
    //   } else {
    //     alert('Invalid Password!!');
    //     return false;
    //   }
    // } else {
    //   alert('Account number does not exist!');
    //   return false;
    // }
  }

  getOptions() {
    //accessing token from localstorage
    const token = JSON.parse(localStorage.getItem('token') || '');

    //creating http headers
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('x-access-token', token);
      options.headers = headers;
    }
    return options;
  }

  // deposit
  deposit(acno: any, pswd: any, amt: any) {
    const data = {
      acno,
      pswd,
      amt,
    };

    return this.http.post(
      'http://localhost:3000/deposit',
      data,
      this.getOptions()
    );

    // var amount = parseInt(amt);
    // let database = this.database;

    // if (acno in database) {
    //   if (pswd == database[acno]['password']) {
    //     database[acno]['balance'] += amount;
    //     database[acno]['transaction'].push({
    //       type: 'Credit',
    //       amount: amount,
    //     });
    //     console.log(database);
    //     this.saveDetails();

    //     return database[acno]['balance'];
    //   } else {
    //     alert('Invalid Password!!');
    //     return false;
    //   }
    // } else {
    //   alert('Account number does not exist!');
    //   return false;
    // }
  }

  // withdraw
  withdraw(acno: any, pswd: any, amt: any) {
    const data = {
      acno,
      pswd,
      amt,
    };

    return this.http.post(
      'http://localhost:3000/withdraw',
      data,
      this.getOptions()
    );

    // var amount = parseInt(amt);
    // let database = this.database;

    // if (acno in database) {
    //   if (pswd == database[acno]['password']) {
    //     if (database[acno]['balance'] > amount) {
    //       database[acno]['balance'] -= amount;
    //       database[acno]['transaction'].push({
    //         type: 'Debit',
    //         amount: amount,
    //       });
    //       this.saveDetails();
    //       return database[acno]['balance'];
    //     } else {
    //       alert('Insufficient balance!!');
    //       return false;
    //     }
    //   } else {
    //     alert('Invalid Password!!');
    //     return false;
    //   }
    // } else {
    //   alert('Account number does not exist!');
    //   return false;
    // }
  }

  //transaction
  transaction(acno: any) {
    const data = {
      acno,
    };
    return this.http.post(
      'http://localhost:3000/transaction',
      data,
      this.getOptions()
    );
    // return this.database[acno]['transaction'];
  }

  //onDelete
  onDelete(acno: any) {
    return this.http.delete(
      'http://localhost:3000/onDelete/' + acno,
      this.getOptions()
    );
  }
}
