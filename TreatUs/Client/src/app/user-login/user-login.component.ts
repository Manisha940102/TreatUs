import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginService } from 'app/user-login/user-login.service';
import { AuthService } from 'app/auth/auth.service';
import { Email } from 'app/models/Email';
import { Users } from 'app/models/Users';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  submitted = false;
  users: Users[];
  email: string;
  password: string;
  showAlert: boolean = false;
  encPassword: string;
  encEmail: string;
  showLogingSpinner:boolean=false;


  constructor(private formBuilder: FormBuilder, private service: UserLoginService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


    this.users = await this.service.getUserDetails().toPromise();
    debugger;

  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  async setLoginValues(email,password){

    debugger;
    /* this.encEmail = CryptoJS.AES.encrypt('',email).toString(CryptoJS.format.Hex);  
    console.log(this.encEmail);
    this.encPassword = CryptoJS.AES.encrypt('',password).toString(CryptoJS.format.Hex);  
    console.log(this.encPassword);
    await this.service.addUserLogin().toPromise(); */
    this.email = email;
    this.password = password;
  }

  onSubmit() {
    debugger;
    this.showLogingSpinner=true;
    this.submitted = true;
    if (this.form.invalid) {
      this.showLogingSpinner=false;
      return;
    }

    else {
      this.showAlert=true;
      for (let i = 0; i < this.users.length; i++) {
        
        if (this.users[i].email == this.email && this.users[i].password == this.password) {
          this.authService.login(this.form.value);
          this.showAlert=false;
          return;
        }
        else{
        }

      }

    }
    this.formSubmitAttempt = true;
    // display form values on success
    this.showLogingSpinner=false;
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
  
}
 