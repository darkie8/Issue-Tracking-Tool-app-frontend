import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-personalized-dashboard-view',
  templateUrl: './personalized-dashboard-view.component.html',
  styleUrls: ['./personalized-dashboard-view.component.css'],
  providers: [MessageService]
})
export class PersonalizedDashboardViewComponent implements OnInit {
  public col_sort: MenuItem[];
  public my_issues: MenuItem[];
  details: any;
  visibleSidebar5;
  constructor(service: IssueTrackingServiceService,
    private toast: MessageService) {
    this.details = new Object(service.getdataLocalStorage('user_details'));
    console.log(this.details);
  }

  ngOnInit() {

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


