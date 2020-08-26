import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'app/auth/auth.guard';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
} 
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Home',  icon: "home", class: '' },
    { path: '/adminInfo' , title: '',icon:'dashboard', class: ''},
    { path: '/provider/invitation/:treatId', title: 'New Treat',  icon:'Notifications', class: '' },
    { path: '/admintreat', title: 'Admin Treats',  icon:'unarchive', class: '' },
    { path: '/users', title: 'Users',  icon:'person', class: '' },
    { path:'/restaurantsDetails', title:'Restaurants Details', icon:'bubble_chart',class: ''},
    { path: '/myTreat/:treatId', title: 'My Treat',  icon:'library_books', class: '' },
   // { path: '/treatSummary/:treatId',title:'Treat Summaries', icon:'', class:''},
   // { path: '/login',title:'Login',icon:'Notifications',class:''}
   // { path:'/providerTreat/:treatId', title:'ProviderTreat', icon:'Notifications', class: '' },
  //  { path: '/treat/:treatId', title: 'Treat',  icon:'library_books', class: '' },
  //  { path: '/maps', title: 'My Treat',  icon:'location_on', class: '' },
  //  { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
   // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
   // { path: '/restaurants', title: 'Restaurants',  icon:'unarchive', class: '' },
];
export const ADMINROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Home',  icon: "home", class: '' },
  { path: '/adminInfo' , title: 'Admin Info',icon:'dashboard', class: ''},
   { path: '/provider/invitation/:treatId', title: 'New Treat',  icon:'Notifications', class: '' },
  { path: '/admintreat', title: 'Admin Treats',  icon:'unarchive', class: '' },
  { path: '/users', title: 'Users',  icon:'person', class: '' },
  { path:'/restaurantsDetails', title:'Restaurants Details', icon:'bubble_chart',class: ''},
  { path: '/myTreat/:treatId', title: 'My Treat',  icon:'library_books', class: '' },
  { path: '/treatSummary',title:'Treat Summaries', icon:'bubble_chart', class:''},
];

export const USERROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Home',  icon: "home", class: '' },
  { path: '/myTreat/:treatId', title: 'My Treat',  icon:'library_books', class: '' },
  
];
export const PROVIDERROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Home',  icon: "home", class: '' },
  { path: '/provider/invitation/:treatId', title: 'New Treat',  icon:'Notifications', class: '' },
  { path: '/myTreat/:treatId', title: 'My Treat',  icon:'library_books', class: '' },
  { path: '/treatSummary',title:'Treat Summaries', icon:'bubble_chart', class:''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  adminMenuItems:any[];

  constructor() { }

  ngOnInit() {
  //  this.menuItems = ROUTES.filter(menuItem => menuItem);
    if(localStorage.getItem("role") == 'admin'){
      this.menuItems = ADMINROUTES.filter(menuItem => menuItem);
      return;
    }
    if(localStorage.getItem("role") == 'user'){
      this.menuItems = USERROUTES.filter(menuItem => menuItem);
      return;
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
