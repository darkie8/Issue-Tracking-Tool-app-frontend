import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
import { MessageService } from 'primeng/api';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {

  @Input() input1e: any;
  page_name: any;
  constructor(public service: IssueTrackingServiceService,
    private toast: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.page_name = this.input1e;

  }
  /**
  * logout
  */
  public logOut() {
    this.toast.add({
      key: 'logout',
      severity: 'warn',
      summary: 'Logging out',
      detail: 'You are being logged out'
    });
    setTimeout(() => {
      this.service.logout().subscribe(
        data => {
          localStorage.clear();
          Cookie.deleteAll();
        },
        err => {

        }
      );
      this.router.navigate(['/login']);
    }, 2000);
  }
  /**
   * goTosearchView
   */
  public goTosearchView() {

  }

}
