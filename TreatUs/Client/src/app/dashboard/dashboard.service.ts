import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private url = Appsetting.Url_api + "Treat";
 
  constructor(private http : HttpClient) { }

}
