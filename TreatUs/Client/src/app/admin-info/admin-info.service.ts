import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Appsetting } from 'app/models/Appsetting';
import { Model } from 'app/models/Model';
import { Users } from 'app/models/Users';
import { Treat } from 'app/models/Treat';
import { Restaurants } from 'app/models/Restaurants';

@Injectable({
  providedIn: 'root'
})
export class AdminInfoService {
  treatType: number;
  private url = Appsetting.Url_api + 'treat';
  private userUrl = Appsetting.Url_api + 'users';
  private rurl = Appsetting.Url_api + 'restaurants';

  constructor(private http: HttpClient) { }

  getRestaurantsdetails(){
    debugger;
    let getRestaurantsDetailsUrl = this.rurl;
    let res = this.http.get<Array<Restaurants>>(getRestaurantsDetailsUrl);
    return res;
  }

  addAdminInformations(model: Model, hour: number, minute: number, type: number, category: number, providers: any) {
    debugger;
    const myObj = {
      datetime: model.day + "/" + model.month + "/" + model.year + " " + hour + ":" + minute,
      type,
      providers,
      category
    };
    const myObjStr = JSON.stringify(myObj);
    let addAdminInformationsUrl = this.url;
    return this.http.post<Treat>(addAdminInformationsUrl, JSON.parse(myObjStr));
  }
  getUserDetails() {
    debugger;
    let getUserDetailsUrl = this.userUrl;
    return this.http.get<Array<Users>>(getUserDetailsUrl);
  }
}
