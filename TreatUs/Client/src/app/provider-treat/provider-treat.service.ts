import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';

import { Model } from 'app/models/Model';
import { logging } from 'protractor';
import { GeneralInfo } from 'app/models/GeneralInfo';
import { Treat } from 'app/models/Treat';

@Injectable({
  providedIn: 'root'
})
export class ProviderTreatService {

  private summaryUrl = Appsetting.Url_api + 'treat';

  constructor(private http: HttpClient) { }

  getTreatDetails(treatId: string) {
    debugger;
    let getTreatDetails = this.summaryUrl + '/' + treatId;
    let res = this.http.get<Treat>(getTreatDetails);
    return res;
  }

  getAllTreatDetails() {
    debugger;
    let allGetTreatDetails = this.summaryUrl;
    let res = this.http.get<Treat>(allGetTreatDetails);
    return res;
  }

}
