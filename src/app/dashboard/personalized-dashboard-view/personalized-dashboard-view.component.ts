import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
import { MessageService } from 'primeng/api';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
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
  status: any;
  title: any;
  reporter: any;
  dates: any;
  allIssuelength: any[];
  totalData: any[];
  constructor(private service: IssueTrackingServiceService,
    private toast: MessageService,
    private router: Router,
    public order: OrderPipe) {
    this.details = new Object(service.getdataLocalStorage('user_details'));
    console.log(this.details);
  }
  goTocreateAnIssue = () => {
    this.router.navigate(['/issue_description/create']);

  }

  showingtoast = (array: any[]) => {
    if (array.length === 0) {
      this.toast.add({
        key: 'erriss1',
        severity: 'warn',
        summary: 'No issue availablle ',
        detail: 'Issues with such credentials are not avaliable'
      });
    }
  }

  ngOnInit() {
    this.service.getAlltheIssues(Cookie.get('authToken')).subscribe(
      data1 => {
        if (data1['status'] === 200) {
          const allIssues = data1['data'];
          this.allIssuelength = allIssues.length;
          console.log(this.allIssuelength);
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
          detail: 'No Reported Issuess found'
        });
      }
    );
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
          detail: 'No Reported Issuess found'
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
            detail: 'No assigned Issuess found'
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
    this.service.table_of_issues(0, '5', Cookie.get('authToken')).subscribe(
      data => {
        this.totalData = data['data'];
        console.log(data['data']);
        this.status = data['data'].map(info => info.status);
        this.title = data['data'].map(info => info.title);
        this.dates = data['data'].map(info => info.createdOn);
        this.reporter = data['data'].map(info => info.reporter);
      },
      err => {
        this.status = 'error';
        this.title = 'error';
        this.dates = 'error';
        this.reporter = 'error';
      }
    );

    this.col_sort =
      [
        {
          label: 'Status',
          icon: 'pi pi-file',
          items: [
            {
              label: 'In-progress', icon: 'pi pi-circle-on', command: (event) => {
                const totalData = this.totalData.filter(info => info.status === 'in-progress');
                this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
                this.showingtoast(this.status);
              }
            },
            {
              label: 'Backlog', icon: 'pi pi-star', command: (event) => {
                const totalData = this.totalData.filter(info => info.status === 'backlog');
                this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
                this.showingtoast(this.status);
              }
            },
            {
              label: 'Testing', icon: 'pi pi-cog', command: (event) => {
                const totalData = this.totalData.filter(info => info.status === 'testing');
                this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
                this.showingtoast(this.status);
              }
            },
            {
              label: 'Completed', icon: 'pi pi-circle-off', command: (event) => {
                const totalData = this.totalData.filter(info => info.status === 'completed');
                this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
                this.showingtoast(this.status);
              }
            }
          ]
        },
        {
          label: 'Title',
          icon: 'pi pi-fw pi-pencil',
          items: [
            { label: 'A > Z', icon: 'pi pi-angle-double-down', command: (event) => {
              const totalData = this.order.transform(this.totalData, 'title');
              this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
            } },
            { label: 'Z > A', icon: 'pi pi-angle-double-up', command: (event) => {
              const totalData = this.order.transform(this.totalData, 'title', true);
              this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
            }  }
          ]
        },
        {
          label: 'Date',
          icon: 'pi pi-clock',
          items: [
            { label: 'Descending', icon: 'pi pi-angle-double-down', command: (event) => {
              const totalData = this.order.transform(this.totalData, 'date', true);
              this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
            } },
            { label: 'Ascending', icon: 'pi pi-angle-double-up', command: (event) => {
              const totalData = this.order.transform(this.totalData, 'date', false);
              this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
            } }
          ]
        },
        {
          label: 'Reporter',
          icon: 'pi pi-user',
          items: [
            { label: 'A > Z', icon: 'pi pi-angle-double-down', command: (event) => {
              const totalData = this.order.transform(this.totalData, 'reporter');
              this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
            } },
            { label: 'Z > A', icon: 'pi pi-angle-double-up',  command: (event) => {
              const totalData = this.order.transform(this.totalData, 'reporter', true);
              this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
            }  }
          ]
        }
      ];

    this.showingtoast(this.status);
  }

  public paginate(event) {
    console.log(event.page);
    // table
    this.service.table_of_issues(event.page * event.rows, `${event.rows}`, Cookie.get('authToken')).subscribe(
      data => {
        this.totalData = data['data'];
        console.log(data['data']);
        this.status = data['data'].map(info => info.status);
        this.title = data['data'].map(info => info.title);
        this.dates = data['data'].map(info => info.createdOn);
        this.reporter = data['data'].map(info => info.reporter);
      },
      err => {
        this.status = 'error';
        this.title = 'error';
        this.dates = 'error';
        this.reporter = 'error';
      }
    );
  }
  /**
   * default
   */
  public default() {
    // tslint:disable-next-line:prefer-const
    let totalData = this.totalData;
    this.status = totalData.map(info => info.status);
    this.title = totalData.map(info => info.title);
    this.dates = totalData.map(info => info.createdOn);
    this.reporter = totalData.map(info => info.reporter);
    this.showingtoast(this.status);
  }

}


