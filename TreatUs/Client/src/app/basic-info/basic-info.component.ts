import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicInfoService } from './basic-info.service';
import { Treat } from 'app/models/Treat';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  treat: Treat;
  treatId: string;
  userName: string;

  constructor(private _router: Router, private route: ActivatedRoute, private service: BasicInfoService) { }

  async ngOnInit() {
    this.userName = this.route.snapshot.params.userName;
    this.treatId = this.route.snapshot.params.treatId;
    if (!this.treatId) return;
    this.treat = await this.service.getTreatDetails(this.userName, this.treatId).toPromise();
  }

  getDate() {
    return this.treat.dateTime;
  }

  getProvidersString() {
    return this.treat.providers.map(t => t.name).join(",");
  }

  getTreatTypeText() {
    let treatTypeText = '';
    switch (this.treat.type) {
      case 0:
        treatTypeText = 'Birthdays';
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

  nextClick() {
    this._router.navigate(['provider/restaurant/' + this.userName + '/' + this.treatId]);
  }
}