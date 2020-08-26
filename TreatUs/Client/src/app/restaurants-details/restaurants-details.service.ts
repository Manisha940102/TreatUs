import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsetting } from 'app/models/Appsetting';

import { Restaurants } from 'app/models/Restaurants';
import { Menu } from 'app/models/Menu';


@Injectable({
  providedIn: 'root'
})
export class RestaurantsDetailsService {

  restaurants: Restaurants;
  private url = Appsetting.Url_api + 'restaurants';

  constructor(private http: HttpClient) { }

  addRestaurantsDetails(restaurant: any) {
    let addAdminInformationsUrl = this.url;
    return this.http.post<Array<Restaurants>>(addAdminInformationsUrl, restaurant);

  }

  getRestaurants() {
    return this.http.get<Array<Restaurants>>(this.url);
  }

  deleteRestaurant(restaurant: string) {
    let deleteRestaurantUrl = this.url + '/' + restaurant ;
    return this.http.delete<Restaurants>(deleteRestaurantUrl);
  }

  updateRestaurant(id:string , restaurant:Restaurants){
    let putUrl = this.url+'/'+id;
    return this.http.put<Restaurants>(putUrl,restaurant);
  }

}
