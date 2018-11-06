import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
import { ToastsManager } from '../../../../node_modules/ng6-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userid: any;
  email;
  password;
  data = {
    email: this.email,
    password: this.password
  };
  constructor(private routeend: ActivatedRoute,
    public httpservice: IssueTrackingServiceService,
    private toastr: ToastsManager, private router: Router,
    private messageService: MessageService,
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

  /**
   * goToDashboard
   */

  public goToDashboard() {
    this.router.navigate(['/dashboard']);

  }

  /**
   * login
   */
  public login() {
    let promise;
    this.httpservice.loginmethod(this.data).subscribe(
      data => {

        if (data.status === 200) {

          this.messageService.add({
            severity: 'success',
            summary: 'Login done',
            detail: 'Login has been done and app is accessing your info from the server'
          });
          // saving authtoken, userid and name as cookies
          Cookie.set('authToken', data.data.authToken);
          Cookie.set('receiverId', data.data.userDetails.userId);
          Cookie.set('receiverName', data.data.userDetails.firstName + ' ' + data.data.userDetails.lastName);

          // saving user details in localstorage
          this.httpservice.setdatatoLocalStorage(data.data.userDetails);

          // shooting the users to the personal dashboard page
          promise = Promise.resolve(data.data.userDetails.firstName + ' ' + data.data.userDetails.lastName);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Login failed',
            detail: data.message
          });
          promise = Promise.reject('login failed');
        }
      },
      err => {
        promise = Promise.reject('login failed');
        this.messageService.add({
          severity: 'error',
          summary: 'Login failed',
          detail: 'Server is not working'
        });
       }
    );

  }


}
