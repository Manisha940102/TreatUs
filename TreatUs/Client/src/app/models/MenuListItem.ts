
export class MenuListItem {
    id:string;
    restaurantName:string;
    menuId:string;
    menuName: string; 
    specification:string; 
    price:string;
    
       
       
    public constructor(init?: Partial<MenuListItem>) {
        Object.assign(this, init);
    }
 }