import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';  

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  email:string;  
  currentPassword:string;
  encPassword: string; 
  password :string;
  output: string;  
  
  constructor() { }

  ngOnInit() {
  }
  changePassword(){
    debugger;
    this.output = CryptoJS.AES.encrypt('',this.encPassword).toString(CryptoJS.format.Hex);  
    console.log(this.output);
  }

}
