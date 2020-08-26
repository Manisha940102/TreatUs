import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl, Validator } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedRestaurant } from 'app/models/SelectedRestaurant';
import { Treat } from 'app/models/Treat';
import { ProviderTreatService } from './provider-treat.service';
import { GeneralInfo } from 'app/models/GeneralInfo';
import { AdminRestaurants } from 'app/models/AdminRestaurants';
import { Restaurants } from 'app/models/Restaurants';
import { AdminTreat } from 'app/models/AdminTreat';
import { Name } from 'app/models/Name';

@Component({
  selector: 'app-provider-treat',
  templateUrl: './provider-treat.component.html',
  styleUrls: ['./provider-treat.component.css']
})
export class ProviderTreatComponent implements OnInit {
  adminRestaurant: AdminRestaurants;
  generalInfo: GeneralInfo;
  treat: Treat;
  res: SelectedRestaurant[];
  name: string;
  resList: Array<AdminTreat> = [];

  treatId: string;
  treatTypeText: string;
  status: string;

  displayedColumns: string[] = ['Date', 'VoteEndTime', 'TreatType', 'Category', 'ProviderNames', 'Status'];
  dataSource = new MatTableDataSource<AdminTreat>(this.resList);
  selection = new SelectionModel<AdminTreat>(true, []);
  select: any[];

  constructor(private _router: Router, private route: ActivatedRoute, public fb: FormBuilder, private service: ProviderTreatService) { }

  async ngOnInit() {
    debugger;
    this.treatId = this.route.snapshot.params.treatId;

    if (!this.treatId) return;
    this.treat = await this.service.getTreatDetails(this.treatId).toPromise();
    // this.adminSummary = await this.service.getAllAdminSummaryDetails().toPromise();
    console.log(this.treat);

    switch (this.treat.type) {
      // switch (this.treat.treatType) {
      case 0:
        this.treatTypeText = 'Birthdays';
        break;
      case 1:
        this.treatTypeText = 'First Salary';
        break;
      case 2:
        this.treatTypeText = 'Car';
        break;
      default:
        this.treatTypeText = 'Special Occasion';
        break;
    }
    this.name = this.treat.providers.map(t => t.name).join(",");

    switch (this.treat.status) {
      case 0:
        this.status = 'Pending';
        break;
      case 1:
        this.status = 'Invitation sent';
        break;
      case 2:
        this.status = 'Provider Rejected';
        break;
      default:
        this.status = 'All Provider Accepted';
        break;
    }


    for (var i = 0; i <= 1; i++) {
      //  this.res = this.treat.adminRestaurants[i].res;
      //  this.name =  this.adminSummary.adminInfo.selectedProviders.name[i].item_text;
    }
    let resObj = new AdminTreat();
    resObj.generalInfo = this.generalInfo;
    resObj.res = this.res;
    resObj.treatTypeText = this.treatTypeText;
    resObj.name = this.name;
    resObj.status = this.status;
    this.resList.push(resObj);
    console.log(this.resList);

    this.dataSource = new MatTableDataSource<AdminTreat>(this.resList);
    this.selection = new SelectionModel<AdminTreat>(true, []);
    console.log(this.dataSource, this.selection);


  }


}
