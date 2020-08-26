import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,  FormArray, Validators,FormGroup, FormControl, Validator } from "@angular/forms";

import { Treat } from 'app/models/Treat';
import { GeneralInfo } from 'app/models/GeneralInfo';
import { Restaurants } from 'app/models/Restaurants';
import { TreatService } from './treat.service';

@Component({
  selector: 'app-treat',
  templateUrl: './treat.component.html',
  styleUrls: ['./treat.component.css']
})
export class TreatComponent implements OnInit {
  public show:boolean = false;
  public show1:boolean = false;
  marked = false;

  generalInfo:GeneralInfo;
  treat: Treat;

  treatId: string;
  treatTypeText:string;
  treatType:string;
  restaurants : Restaurants[];
  restaurantName: string;
  menuName : string;
  ratings: number;

  constructor(private _router: Router, private route: ActivatedRoute,public fb: FormBuilder,private service: TreatService) { }

  async ngOnInit() {
    debugger;
    this.treatId = this.route.snapshot.params.treatId;

    if (! this.treatId ) return; 
    this.treat = await this.service.getTreatDetails(this.treatId).toPromise(); 
    console.log(this.treat);

    switch (this.treat.type) {
      // switch (this.treat.treatType) {
         case 0:
          this.treatTypeText = 'Birthdays';
           break;
         case 1:
           this.treatTypeText = 'First Salary';    
           break;
         case 2:
           this.treatTypeText = 'Car';
           break;
         default:
           this.treatTypeText = 'Special Occasion';
           break;
       }
       this.treatType = this.treatTypeText;   

  
  }

  getTreatTypeText(){
    
    return this.treatType;
  }

  getFirstProviderString(){
    
    return this.treat.providers[0].name;   
  }

  getSecondProviderString(){
    
   return this.treat.providers[1].name;
  }

  getThirdProviderString(){
   
   return this.treat.providers[2].name;
  }
  getRestautantString(){
   
    // this.restaurants = this.adminSummary.adminRestaurants[0].res ; 
    //  console.log(this.restaurants);
    //  this.restaurantName= this.restaurants[0].restaurantName;
    //  console.log(this.restaurantName);
    // return this.restaurantName;
   this.restaurantName = "KFC";
    return this.restaurantName;
  }
  getMenuItemsString(){
    this.menuName = "Burger";
    return this.menuName;
  }
  getMenuRatings(){
    this.ratings = 0;
    return this.ratings ;
  }
  getSpecificationString(){
    return "Chicken";
  }
  toggle(){
    this.show = !this.show;
  }
  toggleVisibility(e){
    this.marked= e.target.checked;
    this.show1 = !this.show1;
  }
  async likeClick(){
    debugger;
    this.ratings = this.ratings + 1; 
    return this.ratings;
   
  } 
  
  
}
