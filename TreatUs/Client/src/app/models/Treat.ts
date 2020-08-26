import { GeneralInfo } from "./GeneralInfo";
import { AdminRestaurants } from "./AdminRestaurants";
import { TreatStatus } from "./TreatStatus";
import { TreatUser } from "./TreatUser";
import { TreatUsers } from '../models/TreatUsers';
import { from } from "rxjs";
import { SelectedProviders } from "./SelectedProviders";
import { TreatType } from "./TreatType";
import { Restaurants } from "./Restaurants";
import { Categories } from "./Categories";
import { UserEmailStatus} from "./UserEmailStatus";

export class Treat{
     id: string;
     dateTime:string;
     type:TreatType;
     otherTreatType:string;
     category:Categories;
     providers:SelectedProviders[];  
     status: TreatStatus;
     userEmailStatus: UserEmailStatus;
     restaurants:Restaurants[];
     treatUsers:TreatUsers[];

  //    constructor(treatId: string, status: number) {
  //     this.id = treatId;
  //     this.status = status
  // }
}