import { Component, OnInit } from '@angular/core';
import { Users } from 'app/models/Users';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserService } from './add-user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  users: Users;
  userForm: FormGroup;
  message: string = null;
  isEditing: boolean = false;
  inputName: string;
  inputEmail: string;
  inputPhoneNumber: string;
  inputRole: string;
  editingUid: string;
  showSpinner: Boolean = true;
  term: string;
  showSaveSpinner: boolean = false;
  showAlert: boolean = false;
  inputPassword: string;
  role: string;
  encPassword: string;
  userToRemove: Users;
  alertMessage: string;

  constructor(private _router: Router, private service: AddUserService, private fb: FormBuilder) {

    this.userForm = this.fb.group({
      inputName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      inputEmail: new FormControl('', [
        Validators.required]),
      inputPhoneNumber: new FormControl('', [
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]\d*$/)
      ]),
      inputRole: new FormControl(''),
      inputPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),

      ])
    });
    this.message = "Add User";

  }
  get name() { return this.userForm.get('inputName') }
  get email() { return this.userForm.get('inputEmail') }
  get phone() { return this.userForm.get('inputPhoneNumber') }
  get password() { return this.userForm.get('inputPassword') }



  async ngOnInit() {
    this.showSaveSpinner = false;
    this.role = localStorage.getItem('role');
    console.log(this.role);
    if (this.role != 'admin') {
      this._router.navigate(['unauthorizedUser/']);
      return;
    }
    this.users = await this.service.getUserDetails().toPromise();
    this.showSpinner = false;
  }

  async deleteClick() {
    this.users = await this.service.deleteUserDetails(this.userToRemove.email, this.users).toPromise();
    this.ngOnInit();
    this.showAlert = true;
  }

  setDeleteUser(user: Users) {
    this.userToRemove = user;
    this.alertMessage = ' deleted!!'
  }

  dismissAlert() {
    this.showAlert = false;
  }

  editClick(item) {
    this.editingUid = item.id;
    this.isEditing = true;
    this.message = "Editing : " + item.name;
    this.inputName = item.name;
    this.inputEmail = item.email;
    this.inputPhoneNumber = item.phoneNumber;
    this.inputRole = item.role;
    this.inputPassword = item.password;
  }

  resetClick() {
    this.isEditing = false;
    this.message = "Add user";
    this.inputName = null;
    this.inputEmail = null;
    this.inputPhoneNumber = null;
    this.inputRole = null;
    this.inputPassword = null;

    this.name.markAsUntouched();
    this.name.markAsPristine();
    this.email.markAsUntouched();
    this.email.markAsPristine();
    this.password.markAsUntouched();
    this.password.markAsPristine();

    this.userForm.clearValidators();
  }

  async addClick(myInput1, myInput2, myInput3, myInput4, myInput5) {
    this.showSaveSpinner = true;
    this.users.id = this.editingUid;
    this.users.name = myInput1;
    this.users.email = myInput2;
    this.users.password = myInput3;
    this.users.phoneNumber = myInput4;
    this.users.role = myInput5;
    this.users.isActive = true;

    if (this.isEditing) {
      var editedUser: Users = {
        name: myInput1,
        email: myInput2,
        password: myInput3,
        phoneNumber: myInput4,
        role: myInput5,
        id: this.editingUid,
        isActive: true
      };
      this.users = await this.service.updateUserDetails(editedUser).toPromise();
    }
    else {
      this.users = await this.service.addUserDetails(myInput1, myInput2, myInput3, myInput4, myInput5, true).toPromise();
    }
    this.showSaveSpinner = false;
    this.resetClick();
    this.ngOnInit();
    this.userToRemove = null;
    this.alertMessage = '';
    this.showAlert = true;
  }

  async updateStatus(item, e) {
    var editedUser: Users = {
      name: item.name,
      email: item.email,
      password: item.password,
      phoneNumber: item.phoneNumber,
      role: item.role,
      id: item.id,
      isActive: e.checked
    };
    this.showSpinner = true;
    this.users = await this.service.updateUserDetails(editedUser).toPromise();
    this.ngOnInit();
  }
}


