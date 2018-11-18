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
  allIssuelength: any;
  totalData: any[];
  totalData2: any[];
  dataType: string;
  allIssuelengthDefaultUse: any;
  issueId: any;
  constructor(private service: IssueTrackingServiceService,
    private toast: MessageService,
    private router: Router,
    public order: OrderPipe) {
    this.details = new Object(service.getdataLocalStorage('user_details'));
    console.log(this.details);
  }

  // routing to creating issue function
  goTocreateAnIssue = () => {
    this.router.navigate(['/issue_description/create']);

  }
  // routing to view issue page function
  goToViewissue = (id) => {
    this.router.navigate([`/issue_description/view/${id}`]);
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
    this.dataType = 'None';
    this.service.getAlltheIssues(Cookie.get('authToken')).subscribe(
      data1 => {
        if (data1['status'] === 200) {
          const allIssues = data1['data'];
          this.allIssuelength = allIssues.length;
          this.allIssuelengthDefaultUse = this.allIssuelength;
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
        this.totalData2 = this.totalData;
        console.log(data['data']);
        this.status = data['data'].map(info => info.status);
        this.title = data['data'].map(info => info.title);
        this.dates = data['data'].map(info => info.createdOn);
        this.reporter = data['data'].map(info => info.reporter);
        this.issueId  = data['data'].map(info => info.issueId);
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
                this.issueId  = totalData.map(info => info.issueId);
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
                this.issueId  = totalData.map(info => info.issueId);
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
                this.issueId  = totalData.map(info => info.issueId);
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
                this.issueId  = totalData.map(info => info.issueId);
                this.showingtoast(this.status);
              }
            }
          ]
        },
        {
          label: 'Title',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'A > Z', icon: 'pi pi-angle-double-down', command: (event) => {
                const totalData = this.order.transform(this.totalData, 'title');
                this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
                this.issueId  = totalData.map(info => info.issueId);
              }
            },
            {
              label: 'Z > A', icon: 'pi pi-angle-double-up', command: (event) => {
                const totalData = this.order.transform(this.totalData, 'title', true);
                this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
                this.issueId  = totalData.map(info => info.issueId);
              }
            }
          ]
        },
        {
          label: 'Date',
          icon: 'pi pi-clock',
          items: [
            {
              label: 'Descending', icon: 'pi pi-angle-double-down', command: (event) => {
                const totalData = this.order.transform(this.totalData, 'date', true);
                this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
                this.issueId  = totalData.map(info => info.issueId);
              }
            },
            {
              label: 'Ascending', icon: 'pi pi-angle-double-up', command: (event) => {
                const totalData = this.order.transform(this.totalData, 'date', false);
                this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
                this.issueId  = totalData.map(info => info.issueId);
              }
            }
          ]
        },
        {
          label: 'Reporter',
          icon: 'pi pi-user',
          items: [
            {
              label: 'A > Z', icon: 'pi pi-angle-double-down', command: (event) => {
                const totalData = this.order.transform(this.totalData, 'reporter');
                this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
                this.issueId  = totalData.map(info => info.issueId);
              }
            },
            {
              label: 'Z > A', icon: 'pi pi-angle-double-up', command: (event) => {
                const totalData = this.order.transform(this.totalData, 'reporter', true);
                this.status = totalData.map(info => info.status);
                this.title = totalData.map(info => info.title);
                this.dates = totalData.map(info => info.createdOn);
                this.reporter = totalData.map(info => info.reporter);
                this.issueId  = totalData.map(info => info.issueId);
              }
            }
          ]
        }
      ];

    this.showingtoast(this.status);
  }
  /**
   * reportedIssueByUser
   */
  public reportedIssueByUser() {
    this.allIssuelength = 0;
    this.dataType = 'By';
    this.service.table_of_getIssuesAssignedByaCertainUser(0, 5, Cookie.get('authToken')).subscribe(
      data1 => {
        if (data1['status'] === 200) {
          const totalData = data1['data'];
          this.totalData = totalData;
          this.status = totalData.map(info => info.status);
          this.title = totalData.map(info => info.title);
          this.dates = totalData.map(info => info.createdOn);
          this.reporter = totalData.map(info => info.reporter);
          this.issueId  = totalData.map(info => info.issueId);
          this.allIssuelength = this.numberofissuesR;
        } else {
          this.toast.add({
            key: 'erriss2',
            severity: 'error',
            summary: 'Erro',
            detail: 'Problem in fetching data'
          });
          this.status = [];
          this.title = [];
          this.dates = [];
          this.reporter = [];
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
  }

  /**
   * assignedToUser
   */
  public assignedToUser() {
    this.allIssuelength = 0;
    this.dataType = 'To';
    this.service.table_of_IssuesAssignedToaCertainUser(0, 5, Cookie.get('authToken')).subscribe(
      data1 => {
        if (data1['status'] === 200) {
          const totalData = data1['data'];
          this.totalData = totalData;
          this.status = totalData.map(info => info.status);
          this.title = totalData.map(info => info.title);
          this.dates = totalData.map(info => info.createdOn);
          this.reporter = totalData.map(info => info.reporter);
          this.issueId  = totalData.map(info => info.issueId);
          this.allIssuelength = this.numberofissuesA;
        } else {
          this.toast.add({
            key: 'erriss2',
            severity: 'error',
            summary: 'Erro',
            detail: 'No assigned Issuess found'
          });

          this.status = [];
          this.title = [];
          this.dates = [];
          this.reporter = [];
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
  }

  public paginate(event) {
    console.log(event.page);
    // table
    if (this.dataType === 'None') {
      this.service.table_of_issues(event.page * event.rows, `${event.rows}`, Cookie.get('authToken')).subscribe(
        data => {
          this.totalData = data['data'];
          console.log(data['data']);
          this.status = data['data'].map(info => info.status);
          this.title = data['data'].map(info => info.title);
          this.dates = data['data'].map(info => info.createdOn);
          this.reporter = data['data'].map(info => info.reporter);
          this.issueId  = data['data'].map(info => info.issueId);
        },
        err => {
          this.status = 'error';
          this.title = 'error';
          this.dates = 'error';
          this.reporter = 'error';
        }
      );
    } else if (this.dataType === 'To') {
      this.service.table_of_IssuesAssignedToaCertainUser(event.page * event.rows, `${event.rows}`, Cookie.get('authToken')).subscribe(
        data => {
          this.totalData = data['data'];
          console.log(data['data']);
          this.status = data['data'].map(info => info.status);
          this.title = data['data'].map(info => info.title);
          this.dates = data['data'].map(info => info.createdOn);
          this.reporter = data['data'].map(info => info.reporter);
          this.issueId  = data['data'].map(info => info.issueId);
        },
        err => {
          this.status = 'error';
          this.title = 'error';
          this.dates = 'error';
          this.reporter = 'error';
        }
      );
    } else if (this.dataType === 'By') {
      this.service.table_of_getIssuesAssignedByaCertainUser(event.page * event.rows, `${event.rows}`, Cookie.get('authToken')).subscribe(
        data => {
          this.totalData = data['data'];
          console.log(data['data']);
          this.status = data['data'].map(info => info.status);
          this.title = data['data'].map(info => info.title);
          this.dates = data['data'].map(info => info.createdOn);
          this.reporter = data['data'].map(info => info.reporter);
          this.issueId  = data['data'].map(info => info.issueId);
        },
        err => {
          this.status = 'error';
          this.title = 'error';
          this.dates = 'error';
          this.reporter = 'error';
        });
    }
  }
  /**
   * default
   */
  public default() {
    // tslint:disable-next-line:prefer-const
    let totalData = this.totalData2;
    this.status = totalData.map(info => info.status);
    this.title = totalData.map(info => info.title);
    this.dates = totalData.map(info => info.createdOn);
    this.reporter = totalData.map(info => info.reporter);
    this.issueId  = totalData.map(info => info.issueId);
    this.allIssuelength = this.allIssuelengthDefaultUse;
    this.showingtoast(this.status);
  }

}


