import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TreatStatus } from 'app/models/TreatStatus';
import { ProviderInvitationService } from './provider-invitation.service';
import { Treat } from 'app/models/Treat';
import { Name } from "app/models/Name";
import { Users } from 'app/models/Users';


@Component({
  selector: 'app-provider-invitation',
  templateUrl: './provider-invitation.component.html',
  styleUrls: ['./provider-invitation.component.css']
})

export class ProviderInvitationComponent implements OnInit {
  title: string;
  userName: string;
  treatId: string;
  treat: Treat;
  name: Name;
  dateTime:string;
  role:string;

  constructor(private _router: Router, private route: ActivatedRoute, private service: ProviderInvitationService) { }

  async ngOnInit() {
    debugger;
    if (localStorage.getItem('role') == null) {
      debugger;
      this._router.navigate(['login/']); 
      this.treatId = this.route.snapshot.params.treatId;
      localStorage.setItem('treatId',this.treatId);
    }

    this.treatId = this.route.snapshot.params.treatId;
    localStorage.setItem('treatId',this.treatId);
    this.treatId= localStorage.getItem('treatId');
    this.role = localStorage.getItem('role');
    console.log(this.role);
    // if(this.role !='provider'){
    //   this._router.navigate(['unauthorizedUser/']);   
    // }
    this.userName = localStorage.getItem('name');
    console.log(name);
    if (!this.treatId) return;
    this.treat = await this.service.getTreatDetails(this.userName, this.treatId).toPromise();
    this.treat.providers.forEach(provider=>{
      if(provider.name == this.userName && provider.isAccepted == true){
        this._router.navigate(['provider confirmation/']); 
      }
    });
  }
  
  getDate() {
    this.dateTime = this.treat.dateTime;
    return this.dateTime ;
  }

  getProvidersString() {
    return this.treat.providers.map(t => t.name).join(",");
  }

  getTreatTypeText() {
    let treatTypeText = '';
    switch (this.treat.type) {
      case 0:
        treatTypeText = 'Birthday';
        break;
      case 1:
        treatTypeText = 'First Salary';
        break;
      case 2:
        treatTypeText = 'Car';
        break;
      default:
        treatTypeText = this.treat.otherTreatType;
        break;
    }
    return treatTypeText;
  }

  async rejectInvitationClick() {

    let provider = this.treat.providers.find(provider => provider.name === this.userName);
    provider.isAccepted = false;

    if (this.treat.providers.some(provider => provider.isAccepted === false)) {
      this.treat.status = TreatStatus.ProviderRejected;
    }

    await this.service.updateTreat(this.treat).toPromise();

    this._router.navigate(['dashboard']);
  }

  async acceptInvitationClick() {
    let provider = this.treat.providers.find(provider => provider.name === this.userName);
    provider.isAccepted = true;

    if (this.treat.providers.every(provider => provider.isAccepted === true)) {
      this.treat.status = TreatStatus.AllProvidersAccepted;
    }
    await this.service.updateTreat(this.treat).toPromise();

    this._router.navigate(['basicInfo/' +this.userName+'/' +this.treatId]);
  }
}