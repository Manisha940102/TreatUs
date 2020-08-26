import { Menu } from "./Menu";
export class SelectedRestaurant {
    id : string;
    restaurantName: string;  
    address:string;
    telephoneNo:string;
    category:string;
    menus: Menu[];
              
    public constructor(init?: Partial<SelectedRestaurant>) {
        Object.assign(this, init);
    }

 }