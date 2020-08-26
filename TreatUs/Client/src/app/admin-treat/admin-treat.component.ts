import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AdminTreatService } from './admin-treat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Treat } from '../models/Treat';
import { FormBuilder } from '@angular/forms';
import { AdminTreatSummary } from '../admin-treat/adminTreatSummary';
import { Email } from '../models/Email';
import { Appsetting } from '../models/Appsetting';
import { UserEmailStatus } from '../models/UserEmailStatus';
import { SelectedProviders } from '../models/SelectedProviders';
import { ProviderEmail } from '../models/ProviderEmail';
import { TreatUser } from '../models/TreatUser';

@Component({
  selector: 'app-admin-treat',
  templateUrl: './admin-treat.component.html',
  styleUrls: ['./admin-treat.component.css']
})
export class AdminTreatComponent implements OnInit {

  adTreatsHeaders = ["Date", "VoteEnd", "Type", "Category", "Providers", "Status", "Action"];

  treat: Treat[];
  currentTreat: Treat;
  updateTreat: Treat;
  emailStatus: number;
  previousEmailStatus: number;
  treats: Treat[] = [];
  resList: Array<AdminTreatSummary> = [];
  treatId: string;
  emails: Email;
  myEmail:string[]=[];
  status: Boolean;
  emaiSent: Boolean;
  role: string;
  showSpinner: boolean = true;
  removeSpinnerId: string;
  showSpinnerId: string;
  sentMailIds: string[] = [];
  clicked = new Array();
  treatToRemove: AdminTreatSummary;
  treatToSend: AdminTreatSummary;
  showAlert: boolean = false;
  showSendAlert: boolean = false;
  pendingProviderList: SelectedProviders[];
  pendingUserList: TreatUser[];
  deleteTreat: Treat;

  dataSource = new MatTableDataSource<AdminTreatSummary>(this.resList);
  displayedColumns: string[] = ['DateAndVoteTime', 'TreatType', 'Category', 'ProviderNames', 'Status', 'Actions'];


  constructor(private _router: Router, private route: ActivatedRoute, public fb: FormBuilder, private service: AdminTreatService) { }

  async ngOnInit() {
    this.sentMailIds = [];
    this.role = localStorage.getItem('role');
    if (this.role != 'admin') {
      this._router.navigate(['unauthorizedUser/']);
    }
    this.resList = [];
    this.removeSpinnerId = '';
    this.showSpinnerId = '';
    this.treat = await this.service.getAllTreats().toPromise();

    this.treat.forEach(treat => {

      if (treat.userEmailStatus == 1) {
        this.sentMailIds.push(treat.id);
      }

      let adminTreatSummary = new AdminTreatSummary();
      adminTreatSummary.treatId = treat.id;
      adminTreatSummary.dateTime = treat.dateTime;
      adminTreatSummary.otherTreatType = treat.otherTreatType;

      let treatTypeText = '';
      switch (treat.type) {
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
          treatTypeText = adminTreatSummary.otherTreatType;
          break;
      }

      adminTreatSummary.type = treatTypeText;
      let treatCategoryText = '';
      treatCategoryText = this.categorySelector(treat.category)

      adminTreatSummary.category = treatCategoryText;
      let treatStatusText = '';
      switch (treat.status) {
        case 0:
          treatStatusText = 'Pending';
          break;
        case 1:
          treatStatusText = 'Invitation Sent';
          break;
        case 2:
          treatStatusText = 'Provider Rejected';
          break;
        case 3:
          treatStatusText = 'All Providers Accepted';
          break;
        default:
          treatStatusText = 'Other';
          break;
      }
      adminTreatSummary.status = treatStatusText;
      adminTreatSummary.providerName = treat.providers.map(t => t.name).join(", ");
      this.resList.push(adminTreatSummary);
    }); 
    this.showSpinner = false;
    this.dataSource = new MatTableDataSource<AdminTreatSummary>(this.resList.reverse());
  }

  setDeleteTreat(treat: AdminTreatSummary) {
    this.treatToRemove = treat;
  }

  async sendEmailsDeleteTreat(treatId: string) {
    debugger;
    this.deleteTreat = await this.service.findTreatToDelete(treatId).toPromise();
    console.log(this.deleteTreat);
    //this.treatToRemove = this.deleteTreat;
      if(this.deleteTreat.status == 3){
        this.deleteTreat.providers.forEach(async providers =>{
        if(providers.isAccepted == true){
          this.myEmail.push(providers.email);     
        }
        if( this.deleteTreat.userEmailStatus == 1){
          this.deleteTreat.treatUsers.forEach(async users =>{
            this.myEmail.push(users.email);
          })
        }
      });
    }   
  }


  async sendClick(treatId: string) {
    debugger;
    this.showSpinnerId = treatId;
    let emails = new Email()
    var email: string[] = [];

    var selectedTreat = this.treat.find(treat => (treatId == treat.id));

    emails.email = email;
    emails.treatId = treatId;
    emails.treatUrl = Appsetting.Url_myTreat + treatId;

    var providers: string = "";
    selectedTreat.providers.forEach(provider => {
      providers = providers.concat(provider.name.toString()) + " ";
    });

    var splittedDateTime = selectedTreat.dateTime.split(" ", 2);
    emails.date = splittedDateTime[0];
    emails.time = splittedDateTime[1];

    emails.subject = "You are invited to " + this.categorySelector(selectedTreat.category) + " from " + providers;

    if (selectedTreat.userEmailStatus == 1) {
      this.getPendingUsers(treatId);
      if (this.pendingUserList.length != 0) {
        this.pendingUserList.forEach(user => {
          email.push(user.email);
        });
        emails.subject = "Reminder! " + emails.subject;
        this.status = await this.service.sendEmail(emails).toPromise();
      }

    }
    else {
      selectedTreat.treatUsers.forEach(user => { email.push(user.email); });
      this.status = await this.service.sendEmail(emails).toPromise();


      if (this.status == true) {
        this.currentTreat = await this.service.findTreat(treatId).toPromise();
        this.currentTreat.userEmailStatus = 1;
        this.updateTreat = await this.service.updateTreat(this.currentTreat).toPromise();
        this.emailStatus = this.updateTreat.userEmailStatus;
      }
    }
    this.ngOnInit();
    this.showSendAlert = true;
  }

  async removeClick() {
    this.removeSpinnerId = this.treatToRemove.treatId;
    await this.service.deleteTreat(this.treatToRemove.treatId).toPromise();
    this.ngOnInit();
    this.showAlert = true;
    let emails = new Email();
    emails.email = this.myEmail;
    var splittedDateTime = this.deleteTreat.dateTime.split(" ", 2);
    emails.date = splittedDateTime[0];
    emails.time = splittedDateTime[1];
    emails.treatId = this.treatId;
    emails.subject = "Treat that held on "+emails.date+" has been canceled" ;
    console.log(emails);
    debugger;
    this.status = await this.service.sendDeleteEmail(emails).toPromise();
    console.log(this.status);
  }

  async remindProviders(element) {
    var email = new ProviderEmail();
    var splittedDateTime = element.dateTime.split(" ", 2);
    email.date = splittedDateTime[0];
    email.time = splittedDateTime[1];

    email.subject = "Reminder! Please response to your " + this.categorySelector(element.category)
      + " treat by " + element.providerName;
    email.email = [];

    this.getPendingProviders(element.treatId);
    this.pendingProviderList.forEach(provider => {
      email.email.push(provider.email);
    });

    email.treatId = element.treatId;
    email.name = name;
    email.providerUrl = Appsetting.Url_providerInvitation + element.treatId;
    await this.service.sendProviderEmail(email).toPromise();
  }

  getPendingUsers(id) {
    this.pendingUserList = [];
    var treat = this.treat.find(element => element.id == id);
    treat.treatUsers.forEach(user => {
      if (user.pickedItem == null) {
        this.pendingUserList.push(user);
      }
    });
    if (this.pendingUserList.length == 0) {
      return true;
    }
    else {
      false;
    }
  }
  checkEmailStatus(id) {

    var treat = this.treat.find(element => element.id == id);
    if (treat.userEmailStatus == 0) {//0=pending
      return true;
    }
    else {
      return false;
    }

  }

  getPendingProviders(id) {
    this.pendingProviderList = [];

    var treat = this.treat.find(element => element.id == id);
    treat.providers.forEach(provider => {
      if (provider.isAccepted == false) {
        this.pendingProviderList.push(provider);
      }
    });
    if (this.pendingProviderList.length == 0) {
      return true;
    }
    else {
      return false;
    }
  }


  dismissAlert() {
    this.showAlert = false;
  }

  /* disableSend(id) {
    if (this.sentMailIds.find(x => x == id) != null)
      return true;
    else {
      return false;
    }
  } */

  showRemoveSpinner(id) {
    return this.removeSpinnerId == id;
  }

  showOrderSpinner(id) {
    return this.showSpinnerId == id;
  }

  providerStatus(status) {
    return status == "Pending";
  }

  summaryClick(treatId: string) {
    this._router.navigate(['treatSummary/' + treatId]);
  }

  categorySelector(category) {
    switch (category) {
      case 0:
        return 'Breakfast';
        break;
      case 1:
        return 'Lunch';
        break;
      case 2:
        return 'Dinner';
        break;
      case 3:
        return 'Tea Party';
        break;
      case 4:
        return 'Drinks';
        break;
      case 5:
        return 'Desserts';
        break;
      default:
        return 'Other';
        break;
    }
  }
}

