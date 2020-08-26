import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';

import {ProviderInvitationComponent} from '../../provider-invitation/provider-invitation.component';
import { BasicInfoComponent } from 'app/basic-info/basic-info.component';
import{ProviderRestaurantComponent} from 'app/provider-restaurant/provider-restaurant.component';
import{MyTreatComponent}from 'app/my-treat/my-treat.component';
import { AddUserComponent} from 'app/add-user/add-user.component';
//import {AddRestaurantComponent} from 'app/add-restaurant/add-restaurant.component';
import {TreatComponent} from 'app/treat/treat.component';
import {AdminInfoComponent} from 'app/admin-info/admin-info.component';
import {AdminRestaurantComponent} from 'app/admin-restaurant/admin-restaurant.component';
import {AdminTreatComponent} from 'app/admin-treat/admin-treat.component';
import {RestaurantsDetailsComponent } from 'app/restaurants-details/restaurants-details.component';
import {ProviderTreatComponent} from 'app/provider-treat/provider-treat.component';
import {ConfirmComponent} from 'app/confirm/confirm.component'
import {TreatsSummaryComponent} from 'app/treats-summary/treats-summary.component';
import {UnauthorizedUserComponent} from 'app/unauthorized-user/unauthorized-user.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { ProviderConfirmationComponent } from 'app/provider-confirmation/provider-confirmation.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'provider/invitation/:treatId', component:ProviderInvitationComponent},
    { path: 'basicInfo/:userName/:treatId',  component:BasicInfoComponent},
    { path: 'provider/restaurant/:userName/:treatId',component:ProviderRestaurantComponent},
    { path: 'users', component: AddUserComponent},
    { path: 'adminInfo',component : AdminInfoComponent },
    { path: 'adminRestaurant' , component: AdminRestaurantComponent },
   // { path: 'adminRestaurant/:id' , component: AdminRestaurantComponent },
    { path: 'restaurantsDetails', component:RestaurantsDetailsComponent},
    { path: 'providerTreat/:treatId', component: ProviderTreatComponent},
    { path: 'treat/:treatId', component: TreatComponent} ,
    { path: 'myTreat/:treatId', component: MyTreatComponent} , 
    { path: 'treatSummary/:treatId',component:TreatsSummaryComponent},
    { path: 'admintreat', component: AdminTreatComponent},  
    { path: 'confirmation/:message',component:ConfirmComponent},
    { path: 'unauthorizedUser',component: UnauthorizedUserComponent},
    { path: 'provider confirmation',component: ProviderConfirmationComponent}
   
     //  { path: 'myTreat/:treatId', component: MyTreatComponent} ,    
     //  { path: 'restaurants', component:  AddRestaurantComponent} , 
     //canActivate: [AuthGuard]        
];
