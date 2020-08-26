import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';
import { Users } from 'app/models/Users';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private url =  Appsetting.Url_api + 'login';
  private urlUsers =  Appsetting.Url_api + 'users';

  constructor(private http: HttpClient) { }

  addUserDetails(myInput1:string,myInput2:string){
    debugger;
    let addUserDetailsUrl = this.url;
    const object1 ={
       email:myInput1,
       password:myInput2
    };
    var myJSON = JSON.stringify(object1);
    return this.http.post(addUserDetailsUrl,JSON.parse(myJSON));
  }
  getUserDetails() {
    let getUserDetailsUrl = this.urlUsers;
    return this.http.get<Array<Users>>(getUserDetailsUrl);
  }

  addUserLogin(){
    
  }
}
