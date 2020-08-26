import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';
import { Treat } from 'app/models/Treat';

@Injectable({
  providedIn: 'root'
})
export class TreatService {

  private summaryUrl = Appsetting.Url_api+ 'treat';

  constructor(private http: HttpClient) { }

  getTreatDetails(treatId:string){
    debugger;
    let getTreatDetails = this.summaryUrl+'/'+treatId;
    let res = this.http.get<Treat>(getTreatDetails);
    return res;      
  }

}
