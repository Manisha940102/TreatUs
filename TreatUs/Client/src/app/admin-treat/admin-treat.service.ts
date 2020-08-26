import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';
import { Treat } from 'app/models/Treat';
import { Email } from 'app/models/Email';
import { ProviderEmail } from 'app/models/ProviderEmail';
import { id } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class AdminTreatService {
  private url = Appsetting.Url_api + "Treat";
  private surl = Appsetting.Url_api + "sendMail";
  private providerUrl = Appsetting.Url_api + "sendMail" + "/" + "providers";

  constructor(private http: HttpClient) { }

  getAllTreats() {
    return this.http.get<Array<Treat>>(this.url);
  }
  sendEmail(email: Email) {
    let addAdminInformationsUrl = this.surl + "/" + email.treatId;
    return this.http.post<Boolean>(addAdminInformationsUrl, email);
  }
  findTreat(id: string) {
    let findTreatUrl = this.url + '/' + id;
    return this.http.get<Treat>(findTreatUrl);
  }
  findTreatToDelete(treatId){
    let findTreatToDelete = this.url+"/"+treatId;
    return this.http.get<Treat>(findTreatToDelete);
  }

  updateTreat(currentTreat: Treat) {
    let updateTreatUrl = this.url + '/' + currentTreat.id;
    return this.http.put<Treat>(updateTreatUrl, currentTreat);
  }
  deleteTreat(id: string) {
    let deleteUserDetailsUrl = this.url + '/' + id;
    return this.http.delete<Treat>(deleteUserDetailsUrl);
  }
  sendDeleteEmail(email:Email){
    debugger;
    let sendDeleteEmailUrl = this.surl +'/'+"deleteProviders";
    return this.http.post<Boolean>(sendDeleteEmailUrl,email);
  }
  sendProviderEmail(email: ProviderEmail) {
    let sendProviderUrl = this.providerUrl + "/" + email.treatId;
    return this.http.post<Boolean>(sendProviderUrl, email);
  }

}
