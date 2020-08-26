import { Menu } from "./Menu";
export class MenuList {
    menuId:string;
    menuName: string; 
    specification:string;  
    price:string;  
    ratings:number;
    menus: Menu;   
    
    public constructor(init?: Partial<MenuList>) {
        Object.assign(this, init);
    }
 }