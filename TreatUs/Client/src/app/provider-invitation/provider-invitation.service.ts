import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Appsetting } from 'app/models/Appsetting';
import { Treat } from 'app/models/Treat';

@Injectable({
  providedIn: 'root'
})
export class ProviderInvitationService {
  private surl = Appsetting.Url_api + 'treat';

  constructor(private http: HttpClient) { }

  getTreatDetails(userName: string, treatId: string) {
    let getTreatDetailsUrl = this.surl + '/' + userName + '/' + treatId;
    return this.http.get<Treat>(getTreatDetailsUrl);
  }

  updateTreat(treat: Treat) {
    debugger;
    let updateTreatUrl = this.surl + '/' + treat.id;
    return this.http.put<any>(updateTreatUrl, treat);
  }
}
