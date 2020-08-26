import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';
import { Observable } from 'rxjs';
import { Treat } from 'app/models/Treat';
import { TreatUser } from 'app/models/TreatUser';


@Injectable({
  providedIn: 'root'
})
export class TreatSumService {
  private url = Appsetting.Url_api + "Treat";
  private surl = Appsetting.Url_api + "";

  constructor(private http: HttpClient) { }

  getTreatSummary(treatId: string) {
    let getTreatSummaryUrl = this.url + '/' + treatId;
    return this.http.get<Treat>(getTreatSummaryUrl);
  }

}
