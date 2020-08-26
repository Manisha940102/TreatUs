import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  confirm:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.confirm = this.route.snapshot.params.message;
  }
  Confirmation(){
    return this.confirm;  
  }

}
