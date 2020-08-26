import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Appsetting } from 'app/models/Appsetting';
import { Restaurants } from 'app/models/Restaurants';
import { Users } from 'app/models/Users';
import { Treat } from 'app/models/Treat';
import { ProviderEmail } from 'app/models/ProviderEmail';

@Injectable({
  providedIn: 'root'
})
export class AdminRestaurantService {
  users: Users;
  private userUrl = Appsetting.Url_api + 'users';
  private url = Appsetting.Url_api + 'restaurants';
  private summaryUrl = Appsetting.Url_api + 'treat';
  private surl = Appsetting.Url_api + "sendMail"+"/"+"providers";

  constructor(private http: HttpClient) { }

  getTreatDetails(treatId: string) {
    let getTreatDetailsUrl = this.summaryUrl + '/' + treatId;
    return this.http.get<Treat>(getTreatDetailsUrl);
  }
  getRestaurantsDetails() {
    let getRestaurantsDetailsUrl = this.url;
    let res = this.http.get<Array<Restaurants>>(getRestaurantsDetailsUrl);
    return res;
  }
  /*sendAllRestaurantsDetails(treat: Treat) {
    let addAdminInformationsUrl = this.summaryUrl + "/" + treat.id;
    return this.http.put<Treat>(addAdminInformationsUrl, treat);
  }*/
  sendAllRestaurantsDetails(treat: Treat) {
    debugger;
    let addAdminInformationsUrl = this.summaryUrl ;
    debugger;
    return this.http.post<Treat>(addAdminInformationsUrl, treat);
  }
  getUserDetails() {
    debugger;
    let getUserDetailsUrl = this.userUrl;
    return this.http.get<Array<Users>>(getUserDetailsUrl);
  }
  sendEmail(email: ProviderEmail) {
    debugger;
    let addAdminInformationsUrl = this.surl + "/" + email.treatId;
    return this.http.post<Boolean>(addAdminInformationsUrl, email);
  }
}
