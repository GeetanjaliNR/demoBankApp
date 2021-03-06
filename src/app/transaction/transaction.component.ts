import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  transaction: any;
  acno: any;

  constructor(private ds: DataService) {
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '');
    //this.ds.currentAcno;

    this.ds.transaction(this.acno).subscribe(
      (result: any) => {
        this.transaction = result.message;
      },
      (result: any) => {
        alert(result.error.message);
      }
    );
    // this.transaction = this.ds.transaction(this.acno);
    console.log(this.transaction);
  }

  ngOnInit(): void {}
}
