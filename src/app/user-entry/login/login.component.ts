import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
import { ToastsManager } from '../../../../node_modules/ng6-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userid: any;

  constructor(private routeend: ActivatedRoute,
    public httpservice: IssueTrackingServiceService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef) {
    toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (this.routeend.snapshot.paramMap.get('userId')) {
    this.userid = this.routeend.snapshot.paramMap.get('userId');
      this.httpservice.verificationemail(this.userid).subscribe(
        data => {
          this.toastr.success('email verified');
        },
        err => { 
          this.toastr.error('email not verified');
        }
      );
    }
  }

}
