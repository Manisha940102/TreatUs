import { RestaurantOrder } from "./RestaurantOrder";

export class RestaurantTableItem{
    restaurantName:string;
    subTotal:number;
    phone:string;
    restaurantOrders:RestaurantOrder[];
}