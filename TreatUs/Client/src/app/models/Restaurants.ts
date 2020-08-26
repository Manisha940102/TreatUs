import { Menu } from "./Menu";
export class Restaurants {
    id : string;
    restaurantName: string;  
    address:string;
    telephoneNo:string;
    imageBase64:string;
   // category:string;
    menus: Menu[];
         
    public constructor(init?: Partial<Restaurants>) {
        Object.assign(this, init);
    }

}