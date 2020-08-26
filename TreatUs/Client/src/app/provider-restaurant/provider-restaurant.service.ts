import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';
import {Restaurants} from 'app/models/Restaurants';
import { Model } from 'app/models/Model';
import { logging } from 'protractor';
import { GeneralInfo } from 'app/models/GeneralInfo';
import { Treat } from 'app/models/Treat';


@Injectable({
  providedIn: 'root'
})
export class ProviderRestaurantService {

  private generalInfoUrl = Appsetting.Url_api + 'generalInfo';
  private surl = Appsetting.Url_api + 'treat';

  constructor(private http: HttpClient) { }

  getTreatDetails(userName: string, treatId: string){   
    let getTreatDetailsUrl = this.surl + '/' + userName + '/' + treatId;
    return this.http.get<Treat>( getTreatDetailsUrl);
  }

  // getAdminInfo(treatId:string){ 
    
  //   let getAdminInfoUrl = this.adminInfoUrl+ '/' + treatId;
  //   let res = this.http.get<AdminInfo>(getAdminInfoUrl);
  //   return res; 
  // }
  
  updateTreat(treat:Treat){     
    let updateTreatUrl = this.surl + '/' + treat.id;
    let res = this.http.put<Treat>(updateTreatUrl,treat);
    console.log(res);
    return res;  
  }
 
}
