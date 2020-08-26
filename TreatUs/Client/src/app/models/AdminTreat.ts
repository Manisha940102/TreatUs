import { GeneralInfo } from "./GeneralInfo";
import {Restaurants} from "./Restaurants";
import { SelectedRestaurant } from "./SelectedRestaurant";

export class AdminTreat{
    generalInfo:GeneralInfo; 
   // res:Restaurants[];
    res: SelectedRestaurant[];
    treatTypeText:string;
    name:string;
    status:string;
}