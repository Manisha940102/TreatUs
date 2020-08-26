import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {ProviderInvitationComponent } from 'app/provider-invitation/provider-invitation.component';
import {BasicInfoComponent } from 'app/basic-info/basic-info.component';
import {TreatsSummaryComponent} from 'app/treats-summary/treats-summary.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgbModalModule,
    CalendarModule.forRoot({ 
      provide : DateAdapter,
      useFactory:adapterFactory
    })
  ],
  declarations: [
    DashboardComponent,
    ProviderInvitationComponent,
    BasicInfoComponent,
    TreatsSummaryComponent
  ]
})

export class AdminLayoutModule {}
