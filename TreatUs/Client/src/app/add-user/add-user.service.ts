import { Injectable } from '@angular/core';
import { Users } from 'app/models/Users';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  users: Users;
  private url = Appsetting.Url_api + 'users';

  constructor(private http: HttpClient) { }

  getUserDetails() {
    let getUserDetailsUrl = this.url;
    return this.http.get<Users>(getUserDetailsUrl);
  }

  deleteUserDetails(email: string, users: Users) {
    let deleteUserDetailsUrl = this.url + '/' + email;
    return this.http.delete<Users>(deleteUserDetailsUrl);
  }

  updateUserDetails(users: Users) {
    debugger;
    let setUpdateUserUrl = this.url + '/' + users.id;
    return this.http.put<Users>(setUpdateUserUrl, users);
    debugger;
  }


  addUserDetails(name: string, email: string, password: string, phoneNumber: string, role: string, isActive: boolean) {
    debugger;
    const myObj = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      role: role,
      isActive: isActive
    };
    const myObjStr = JSON.stringify(myObj);
    let addUserDetailsUrl = this.url;
    for (var i = 1; i < 2; i++) {
      return this.http.post<Users>(addUserDetailsUrl, JSON.parse(myObjStr));
    }
  }

}
