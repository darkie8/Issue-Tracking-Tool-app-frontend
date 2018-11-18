import { Component, OnInit } from '@angular/core';
import { NavbarComponentComponent } from './../../special-selectors/navbar-component/navbar-component.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
declare var $: any;


@Component({
  selector: 'app-issue-description-view',
  templateUrl: './issue-description-view.component.html',
  styleUrls: ['./issue-description-view.component.css'],
  providers: [MessageService]
})
export class IssueDescriptionViewComponent implements OnInit {

  typeroute: string;
  issueId: string;
  authToken: string;
  reporterInfo: any;
  reportInfo: any;



  constructor(private routeend: ActivatedRoute,
    private httpservice: IssueTrackingServiceService) { }



  ngOnInit() {

    this.typeroute = this.routeend.snapshot.paramMap.get('type');

    // viewing issue
    if (this.typeroute === 'view') {
      this.issueId = this.routeend.snapshot.paramMap.get('issueid');
      this.authToken = Cookie.get('authToken');

      this.httpservice.getSingleIssue(this.issueId, this.authToken).subscribe(
        data => {
          this.reportInfo = data['data'];
          this.httpservice.getSingleuserInfo(this.reportInfo.reporter, this.authToken).subscribe(
            data1 => {
              this.reporterInfo = data1['data'];
              console.log(this.reporterInfo);
            }, err => { }
          );
        }, err => { }
      );
    }

  }




}
