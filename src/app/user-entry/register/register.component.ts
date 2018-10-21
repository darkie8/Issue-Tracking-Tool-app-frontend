import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { ToastsManager } from '../../../../node_modules/ng6-toastr';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(service: IssueTrackingServiceService) { }

  ngOnInit() {
  }

}
