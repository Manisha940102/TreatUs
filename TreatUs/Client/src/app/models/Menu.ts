export class Menu {
    menuId:string;
    menuName: string; 
    category:string;
    subcategory:string;
    specification:string;  
    price:string;    
    ratings:number;
    
    public constructor(init?: Partial<Menu>) {
        Object.assign(this, init);
    }
 }