import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';
import { TreatUser } from 'app/models/TreatUser';
import { Treat } from 'app/models/Treat';
import { GeneralInfo } from 'app/models/GeneralInfo';
import { AdminRestaurants } from 'app/models/AdminRestaurants';
@Injectable({
  providedIn: 'root'
})
export class MyTreatService {
  treatUser: TreatUser
  private surl = Appsetting.Url_api + 'treat';

  constructor(private http: HttpClient) { }

  getTreatDetails(treatId: string) {
    debugger;
    let getTreatDetailsUrl = this.surl + '/' + treatId;
    return this.http.get<Treat>(getTreatDetailsUrl);
  }

  addUserPick(treatId: string, treatUser: TreatUser) {
    debugger;
    console.log(treatUser);
    let setTreatUserUrl = this.surl + '/' + treatId;
    return this.http.put<TreatUser>(setTreatUserUrl, treatUser);
  }

  addUserDetails(treat: Treat) {
    let setTreatUserUrl = this.surl + '/' + treat.id;
    return this.http.put<Treat>(setTreatUserUrl, treat);
  }

}
