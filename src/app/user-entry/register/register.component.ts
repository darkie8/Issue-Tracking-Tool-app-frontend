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

  constructor(
    private service: IssueTrackingServiceService,
    private router: Router,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef) {
    toastr.setRootViewContainerRef(vcr);
  }
  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  ngOnInit() {
  }

  // go to login page
  goToLogin: any = () => {
    this.router.navigate(['/login']);
  }

  // registering user

  signUp: any = () => {
    if (!this.firstName) {
      this.toastr.warning('Firstname missing');


    } else if (!this.lastName) {
      this.toastr.warning('Lastname missing');

    } else if (!this.mobile) {
      this.toastr.warning('Mobile number missing');

    } else if (!this.email) {
      this.toastr.warning('Email missing');

    } else if (!this.password) {
      this.toastr.warning('Password missing');
    } else {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password
      };

      console.log(data);
      this.service.registeringMethod(data).subscribe(
        // if user data is fetched
        success => {
          console.log(success);
          if (success.status === 200) {
            this.toastr.success('registering successful');
            setImmediate(() => this.toastr.success(`A verification message has been sent to ${data.email}`));
            setTimeout(() => {
              this.goToLogin();
            }, 2000);
          } else {
            this.toastr.error(success.message);
          }
        },
        // if user data can not be fetched
        error => {
          this.toastr.warning('can not be registered');
        }
      );
    }
  }
  // registering method ends

}
