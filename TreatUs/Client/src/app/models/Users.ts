export class Users {
    id : string;
    name: string;  
    email:string; 
    password:string;
    phoneNumber:string;
    role: string; 
    isActive:boolean;
    
    constructor( name: string, email: string,password:string,phoneNumber:string, role:string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.isActive=true;
    }

 }