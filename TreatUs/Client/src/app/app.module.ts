import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router} from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBarModule} from '@angular/material'
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatNativeDateModule} from '@angular/material';
import { AuthService } from 'app/auth/auth.service';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { Data } from 'app/models/Data';

import {DemoMaterialModule} from './material-module';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  
  MatListModule,
  MatMenuModule,
  
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  
  MatTreeModule,
} from '@angular/material';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule, 
  MatRippleModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProviderAst } from '@angular/compiler';
import { ProviderInvitationComponent } from './provider-invitation/provider-invitation.component';
import { ProviderInvitationService } from './provider-invitation/provider-invitation.service';
import { ProviderRestaurantComponent } from './provider-restaurant/provider-restaurant.component';
import { MyTreatComponent } from './my-treat/my-treat.component';
import { AddUserComponent } from './add-user/add-user.component';
//import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRestaurantComponent } from './admin-restaurant/admin-restaurant.component';
import { TreatComponent } from './treat/treat.component';
import { AdminTreatComponent } from './admin-treat/admin-treat.component';
import { RestaurantsDetailsComponent } from './restaurants-details/restaurants-details.component';
import { ProviderTreatComponent } from './provider-treat/provider-treat.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoadingSpinnerComponent } from './layouts/loading-spinner/loading-spinner.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UnauthorizedUserComponent } from './unauthorized-user/unauthorized-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProviderConfirmationComponent } from './provider-confirmation/provider-confirmation.component';






// const appRoutes : Routes =[
//   {path:'home',component:DashboardComponent}
// ]

@NgModule({

 // treat:[
 //   id,
 //   Providers[],
 //   Date,
 //   treatType,
 // ],

  imports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    
    MatListModule,
    MatMenuModule,
   
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,

    DemoMaterialModule,
    MatNativeDateModule,
    
    
    MatTreeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgbModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    // NgbModalModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProviderRestaurantComponent,
    MyTreatComponent,
    AddUserComponent,
   // AddRestaurantComponent,
    TreatComponent,
    AdminInfoComponent,
    AdminRestaurantComponent,
    TreatComponent,
    AdminTreatComponent,
    RestaurantsDetailsComponent,
    ProviderTreatComponent,
    ConfirmComponent,
    LoadingSpinnerComponent,
    UserLoginComponent,
    UnauthorizedUserComponent,
    ChangePasswordComponent,
    ProviderConfirmationComponent
    
    //BasicInfoComponent,

  ],
  providers: [AuthService,ProviderInvitationService,Data],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
