import { MenuList } from "./MenuList";
import { Restaurants } from "./Restaurants";
export class RestaurantList{
    restaurantId:string;
    restaurantName:string;
    category:string;
    menuId:string;
    menuName:string;
    specification:string;
    price:string;
    

    public constructor(init?: Partial<RestaurantList>) {
        Object.assign(this, init);
    }
}