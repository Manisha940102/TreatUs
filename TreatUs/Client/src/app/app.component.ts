import { Component, OnInit} from '@angular/core';
import {ProviderInvitationService} from 'app/provider-invitation/provider-invitation.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  treatId: string;

  constructor(private providerInvitationService: ProviderInvitationService){}


  ngOnInit(){
   
//    localStorage.setItem("providerUrl","");
//    localStorage.setItem("mytreatUrl","");

//    this.providerInvitationService.getTreatDetails(this.treatId).subscribe(res =>{
//      this.treat = res;
//    },
//   );
  }

}
