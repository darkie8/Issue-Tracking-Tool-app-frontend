import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  repass: any;

  constructor(
    private service: IssueTrackingServiceService,
    private router: Router,
    private vcr: ViewContainerRef,
    private messageService: MessageService) { }
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
      this.messageService.add({
        key: 'fn',
        severity: 'warn',
        summary: 'firstname missing',
        detail: 'input firstname'
      });


    } else if (!this.lastName) {
      this.messageService.add({
        key: 'ln',
        severity: 'warn',
        summary: 'lastname missing',
        detail: 'input lastname'
      });

    } else if (!this.mobile) {
      this.messageService.add({
        key: 'mob',
        severity: 'warn',
        summary: 'mobile number missing',
        detail: 'input mobile number'
      });

    } else if (!this.email) {
      this.messageService.add({
        key: 'em',
        severity: 'warn',
        summary: 'email missing',
        detail: 'input email'
      });

    } else if (!this.password) {
      this.messageService.add({
        key: 'pass',
        severity: 'warn',
        summary: 'password missing',
        detail: 'input password'
      });
    } else if (this.password !== this.repass) {
      this.messageService.add({
        key: 'rep',
        severity: 'warn',
        summary: 'repass missing',
        detail: 'input password again'
      });
    } else {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.repass
      };

      console.log(data);
      this.service.registeringMethod(data).subscribe(
        // if user data is fetched
        info => {


          if (info.status === 200) {
            this.messageService.add({
              key: 'ems',
              severity: 'info',
              summary: 'an email has been sent',
              detail: `A verification message has been sent to ${data.email}`
            });

            setTimeout(() => {
              this.goToLogin();
            }, 2000);
          } else {
            this.messageService.add({
              key: 'errregno',
              severity: 'error',
              summary: 'error in server',
              detail: info.message
            });

          }
        },
        // if user data can not be fetched
        error => {
          this.messageService.add({
            key: 'regno',
            severity: 'warn',
            summary: 'can not be registered',
            detail: 'can not be registered ;internal problem'
          });

        }
      );
    }
  }
  // registering method ends

}
