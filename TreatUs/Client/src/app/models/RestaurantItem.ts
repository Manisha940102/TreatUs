import { MenuList } from "./MenuList";
import { RestaurantList } from "./RestaurantList";
import { Menu } from "./Menu";

export class RestaurantItem{
    id : string;
    restaurantName: string;  
    address:string;
    telephoneNo:string;
    category:string;
    menus: Menu[];

    public constructor(init?: Partial<RestaurantItem>) {
        Object.assign(this, init);
    }
}