import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // acno = '';
  // uname = '';
  // pswd = '';

  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });
  constructor(
    private ds: DataService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  register() {
    // alert('Register Clicked!!');
    var acno = this.registerForm.value.acno;
    var uname = this.registerForm.value.uname;
    var pswd = this.registerForm.value.pswd;

    if (this.registerForm.valid) {
      this.ds.register(uname, acno, pswd).subscribe(
        (result: any) => {
          if (result) {
            alert(result.message);
            this.router.navigateByUrl('');
          }
        },
        (result: any) => {
          alert(result.error.message);
          this.router.navigateByUrl('');
        }
      );
    } else {
      alert('form invalid');
    }
  }
}
