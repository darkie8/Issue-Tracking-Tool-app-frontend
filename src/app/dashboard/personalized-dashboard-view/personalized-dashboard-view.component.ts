import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
import { MessageService } from 'primeng/api';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
@Component({
  selector: 'app-personalized-dashboard-view',
  templateUrl: './personalized-dashboard-view.component.html',
  styleUrls: ['./personalized-dashboard-view.component.css'],
  providers: [MessageService]
})
export class PersonalizedDashboardViewComponent implements OnInit {
  public col_sort: MenuItem[];
  public my_issues: MenuItem[];
  numberofissuesA: any;
  numberofissuesR: any;
  details: any;
  visibleSidebar5;
  constructor(private service: IssueTrackingServiceService,
    private toast: MessageService,
    private router: Router) {
    this.details = new Object(service.getdataLocalStorage('user_details'));
    console.log(this.details);
  }
   goTocreateAnIssue = () => {
   this.router.navigate(['/issue_description/create']);

  }
  ngOnInit() {
    // Reporter
    this.service.getIssuesAssignedByaCertainUser(Cookie.get('authToken')).subscribe(
      data1 => {
        if (data1['status'] === 200) {
          this.numberofissuesR = data1['data']._length;
        } else {
          this.toast.add({
            key: 'erriss2',
            severity: 'error',
            summary: 'Erro',
            detail: 'Problem in fetching data'
          });
          this.numberofissuesR = 0;
        }
      },
      err => {
        this.toast.add({
          key: 'erriss1',
          severity: 'error',
          summary: 'Erro',
          detail: 'No Issuess found'
        });
      }
    );

    // Assigned
    this.service.getIssuesAssignedToaCertainUser(Cookie.get('authToken')).subscribe(
      data1 => {
        if (data1['status'] === 200) {
          this.numberofissuesA = data1['data']._length;
        } else {
          this.toast.add({
            key: 'erriss2',
            severity: 'error',
            summary: 'Erro',
            detail: 'No Issuess found'
          });

          this.numberofissuesA = 0;
        }
      },
      err => {
        this.toast.add({
          key: 'erriss2',
          severity: 'error',
          summary: 'Erro',
          detail: 'Problem in fetching data'
        });
      }
    );
// table


    this.col_sort =
      [
        {
          label: 'Status',
          icon: 'pi pi-file',
          items: [
            { label: 'Ative', icon: 'pi pi-circle-on' },
            { label: 'Backlog', icon: 'pi pi-star' },
            { label: 'Testing', icon: 'pi pi-cog' },
            { label: 'Completed', icon: 'pi pi-circle-off' }
          ]
        },
        {
          label: 'Title',
          icon: 'pi pi-fw pi-pencil',
          items: [
            { label: 'A > Z', icon: 'pi pi-angle-double-down' },
            { label: 'Z > A', icon: 'pi pi-angle-double-up' }
          ]
        },
        {
          label: 'Date',
          icon: 'pi pi-clock',
          items: [
            { label: 'Descending', icon: 'pi pi-angle-double-down' },
            { label: 'Ascending', icon: 'pi pi-angle-double-up' }
          ]
        },
        {
          label: 'Reporter',
          icon: 'pi pi-user',
          items: [
            { label: 'A > Z', icon: 'pi pi-angle-double-down' },
            { label: 'Z > A', icon: 'pi pi-angle-double-up' }
          ]
        }
      ];
  }




}


