import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginUser } from './LoginUser';
import { Users } from 'app/models/Users';
import { Treat } from 'app/models/Treat';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';

@Injectable()
export class AuthService {
  count: number;
  menuItems: any[];
  role: string;
  treat: Treat;
  treatId: string;
  user: Users;
  users: Users[];
  currentUser: LoginUser;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private url = Appsetting.Url_api + 'users';
  private treatUrl = Appsetting.Url_api + 'treat';

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) { }

  async login(user: LoginUser) {
    debugger;
    this.users = await this.getUserDetails().toPromise();
    console.log(this.users);
    if (user.email !== '' && user.password !== '') {
      this.users.forEach(async dbUser => {
        if (user.email == dbUser.email && user.password == dbUser.password) {
          if (localStorage.getItem('treatId') == null && localStorage.getItem('name') == null && localStorage.getItem('email') == null && localStorage.getItem('role') == null) {
            localStorage.setItem("name", dbUser.name);
            localStorage.setItem("email", dbUser.email);
            localStorage.setItem("role", dbUser.role);
            localStorage.setItem("treatId", null);
            this.router.navigate(['/']);
          };
          if (localStorage.getItem("treatId") == "null") {
            this.role = dbUser.role;
            this.loggedIn.next(true);
            localStorage.setItem("name", dbUser.name);
            localStorage.setItem("email", dbUser.email);
            localStorage.setItem("role", dbUser.role);
            this.router.navigate(['/']);
            return;
          }
          else {
            this.treat = await this.getTreatDetails().toPromise();
            console.log(this.treat);
            this.treatId = this.treat.id;
            this.treat.providers.forEach(providers => {
              if (this.treat.status != 3) {
                localStorage.setItem("name", dbUser.name);
                localStorage.setItem("email", dbUser.email);
                localStorage.setItem("role", dbUser.role);
                this.treatId = localStorage.getItem("treatId");
                console.log(this.treatId);
                providers.email == user.email;
                this.router.navigate(['/provider/invitation/' + this.treatId]);
                return;
              }
              if (this.treat.status == 3) {
                this.treat.treatUsers.forEach(treatUser => {
                  if (treatUser.email == user.email && treatUser.pickedItem == null) {
                    localStorage.setItem("name", dbUser.name);
                    localStorage.setItem("email", dbUser.email);
                    localStorage.setItem("role", dbUser.role);
                    console.log(this.treatId);
                    treatUser.email == user.email;
                    this.router.navigate(['/myTreat/' + this.treatId]);
                    return;
                  }
                });
                var length = 0;
                this.treat.treatUsers.forEach(treatUser => {
                  if (treatUser.pickedItem.length > 0) {
                    length = length + treatUser.pickedItem.length;
                  }
                });
                if (this.treat.treatUsers.length == length) {
                  localStorage.setItem("treatId", "null");
                  this.router.navigate(['/']);
                  return;
                }
              }
            });
          }
        }
      });
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getUserDetails() {
    let getUserDetailsUrl = this.url;
    return this.http.get<Array<Users>>(getUserDetailsUrl);
  }

  getTreatDetails() {
    this.treatId = localStorage.getItem("treatId");
    let getTreatDetailsUrl = this.treatUrl + '/' + this.treatId;
    return this.http.get<Treat>(getTreatDetailsUrl);
  }
}

