import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
declare var $: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'issue-description-true',
  templateUrl: './issue-description-true.component.html',
  styleUrls: ['./issue-description-true.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class IssueDescriptionTrueComponent implements OnInit, OnChanges {
  msgs: Message[] = [];
  msgs1: Message[] = [];
  data1: TreeNode[];
  visibleSidebarfull;
  publishchFlow;
  selectedNode: TreeNode;
  @Input() issueId: any;
  @Input() authToken: any;
  @Input() reportInfo: any;
  @Input() reporterInfo: any;
  reporterInfo1: any;
  reportInfo1: any;
  display: boolean;
  issueTotal;
  like = false;
  dislike = false;
  and: boolean = this.like && this.dislike;
  nand: boolean = (!this.and) ? true : false;
  // tslint:disable-next-line:max-line-length
  items: ({ label: string; icon: string; command: () => void; url?: undefined; routerLink?: undefined; } | { label: string; icon: string; url: string; command?: undefined; routerLink?: undefined; } | { label: string; icon: string; routerLink: string[]; command?: undefined; url?: undefined; })[];
  tags: any;
  description: any;
  label: any;
  createdOn: any;
  modifiedOn: any;
  msgs2: Message[] = [];
  activeTestL: boolean;
  activeTestD: boolean;
  comment: any;
  constructor(private messageService: MessageService,
    private httpservice: IssueTrackingServiceService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.reporterInfo1 = this.reporterInfo;

    // tree

    this.data1 = [
      {
        label: `Reporter`,
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        data: {
          name: `${this.reporterInfo1.firstName} ${this.reporterInfo1.lastName}`, 'avatar': 'walter.jpg',
          issueTitle: `${this.reportInfo.title}`, issueTotal: this.reportInfo
        },
        children: [
          {
            label: 'CFO',
            type: 'person',
            styleClass: 'ui-person',
            expanded: true,
            data: { name: 'Saul Goodman', 'avatar': 'saul.jpg' },
            children: [{
              label: 'Tax',
              styleClass: 'department-cfo'
            },
            {
              label: 'Legal',
              styleClass: 'department-cfo'
            }],
          },
          {
            label: 'COO',
            type: 'person',
            styleClass: 'ui-person',
            expanded: true,
            data: { name: 'Mike E.', 'avatar': 'mike.jpg' },
            children: [{
              label: 'Operations',
              styleClass: 'department-coo'
            }]
          },
          {
            label: 'CTO',
            type: 'person',
            styleClass: 'ui-person',
            expanded: true,
            data: { name: 'Jesse Pinkman', 'avatar': 'jesse.jpg' },
            children: [{
              label: 'Development',
              styleClass: 'department-cto',
              expanded: true,
              children: [{
                label: 'Analysis',
                styleClass: 'department-cto'
              },
              {
                label: 'Front End',
                styleClass: 'department-cto'
              },
              {
                label: 'Back End',
                styleClass: 'department-cto'
              }]
            },
            {
              label: 'QA',
              styleClass: 'department-cto'
            },
            {
              label: 'R&D',
              styleClass: 'department-cto'
            }]
          }
        ]
      }
    ];

  }
  ngOnChanges(changes: SimpleChanges) {
    const reporterInfo = changes.reporterInfo;
    this.reporterInfo1 = reporterInfo.currentValue;

    this.data1 = [
      {
        label: `Reporter`,
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        data: {
          name: `${this.reporterInfo1.firstName} ${this.reporterInfo1.lastName}`, 'avatar': 'walter.jpg',
          issueTitle: `${this.reportInfo.title}`, issueTotal: this.reportInfo
        },
        children: [
          {
            label: 'CFO',
            type: 'person',
            styleClass: 'ui-person',
            expanded: true,
            data: { name: 'Saul Goodman', 'avatar': 'saul.jpg' },
            children: [{
              label: 'Tax',
              styleClass: 'department-cfo'
            },
            {
              label: 'Legal',
              styleClass: 'department-cfo'
            }],
          },
          {
            label: 'COO',
            type: 'person',
            styleClass: 'ui-person',
            expanded: true,
            data: { name: 'Mike E.', 'avatar': 'mike.jpg' },
            children: [{
              label: 'Operations',
              styleClass: 'department-coo'
            }]
          },
          {
            label: 'CTO',
            type: 'person',
            styleClass: 'ui-person',
            expanded: true,
            data: { name: 'Jesse Pinkman', 'avatar': 'jesse.jpg' },
            children: [{
              label: 'Development',
              styleClass: 'department-cto',
              expanded: true,
              children: [{
                label: 'Analysis',
                styleClass: 'department-cto'
              },
              {
                label: 'Front End',
                styleClass: 'department-cto'
              },
              {
                label: 'Back End',
                styleClass: 'department-cto'
              }]
            },
            {
              label: 'QA',
              styleClass: 'department-cto'
            },
            {
              label: 'R&D',
              styleClass: 'department-cto'
            }]
          }
        ]
      }
    ];

  }
  onNodeSelect(event) {
    setTimeout(() => { this.visibleSidebarfull = true; }, 1000);
    this.messageService.add({ severity: 'success', summary: 'Node Selected', detail: event.node.label });
    this.issueTotal = event.node.data.issueTotal;
    this.activeTestL = (this.issueTotal.likegiver.indexOf(this.reporterInfo.userId) === -1) ? false : true;
    this.activeTestD = (this.issueTotal.dislikegiver.indexOf(this.reporterInfo.userId) === -1) ? false : true;
    if (this.activeTestL === this.activeTestD) {
      this.like = false;
      this.dislike = false;
    } else {
      this.like = (this.issueTotal.likegiver.indexOf(this.reporterInfo.userId) === -1) ? true : false;
      this.dislike = (this.issueTotal.dislikegiver.indexOf(this.reporterInfo.userId) === -1) ? true : false;
    }
    console.log([this.like, this.dislike]);
    this.tags = this.issueTotal.tags;
    console.log(this.tags);
    this.description = this.sanitizer.bypassSecurityTrustHtml(this.issueTotal.description);
    this.label = event.node.label;
    this.createdOn = this.issueTotal.createdOn;
    this.modifiedOn = this.issueTotal.modifiedOn;
    console.log(this.issueTotal);

  }



  public updateTags() {
    this.httpservice.editTags([this.issueTotal.tags, 'default'], this.issueTotal.issueId, this.authToken).subscribe(
      data => {
        this.tags = this.issueTotal.tags;
        console.log(data['data']);
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Tags Updated' });
      }, err => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Failure', detail: `Tags couldn't be Updated` });
      }
    );

  }
  /**
   * updateDescription
   */
  public updateDescription() {
    this.httpservice.editDescription(this.issueTotal.description, this.issueTotal.issueId, this.authToken).subscribe(
      data => {
        this.description = this.issueTotal.description;
        console.log(data['data']);
        this.msgs1 = [];
        this.msgs1.push({ severity: 'info', summary: 'Success', detail: 'Description Updated' });
      },
      err => {
        this.msgs1 = [];
        this.msgs1.push({ severity: 'error', summary: 'Failure', detail: `Description couldn't be Updated` });
      }
    );

  }

  /**
   * download
   */
  public download(path) {
    this.httpservice.downloadFile(path, this.issueTotal.issueId, this.authToken).subscribe(
      data => {
        saveAs(data, path);
        this.msgs2 = [];
        this.msgs2.push({key: 'download', severity: 'info', summary: 'Success', detail: 'Download will start soon' });

      },
      err => {
        this.msgs2 = [];
        this.msgs2.push({ severity: 'error', summary: 'Failure', detail: `Download failed` });
      }
    );
  }
  /**
   * likeGenerate
   */
  public likeGenerate(purpose) {

    const func1 = (): any => {

      if (this.like === false && this.dislike === true) {
        // calling api to delete like and delete liker's id
        return new Promise((resolve, reject) => {
          this.httpservice.likeDeleter(this.reporterInfo.userId, this.issueId, this.authToken, purpose)
            .subscribe(
              data1 => {
                console.log(data1['data1']);
                $('#likeIssue').removeClass('active');
                resolve({ like: false, dislike: false });
              },
              err => {
                console.log(err);
                reject({ like: this.activeTestL, dislike: this.activeTestD });
              }
            );
        });
      }


      return new Promise((resolve, reject) => {
        if (this.nand) {
          // when not first like click
          if (this.like === true && this.dislike === false) {
            // calling api to add like and update liker's id
            this.httpservice.likeGenerate(this.reporterInfo.userId, this.issueId, this.authToken, purpose)
              .subscribe(
                data => {
                  console.log(data['data']);
                  // calling api to delete dislike and delete disliker's id
                  this.httpservice.dislikeDeleter(this.reporterInfo.userId, this.issueId, this.authToken, purpose)
                    .subscribe(
                      data1 => {
                        console.log(data1['data1']);
                        $('#likeIssue').addClass('active');
                        $('#dislikeIssue').removeClass('active');
                        resolve({ like: false, dislike: true });
                      },
                      err => {
                        console.log(err);
                        reject({ like: this.activeTestL, dislike: this.activeTestD });
                      }
                    );
                },
                err => {
                  console.log(err);
                  reject({ like: this.activeTestL, dislike: this.activeTestD });
                }
              );
          } else if (this.like === false && this.dislike === false) { // when  first like click
            console.log(this.reporterInfo.userId);

            // calling api to add like and update liker's id
            this.httpservice.likeGenerate(this.reporterInfo.userId, this.issueId, this.authToken, purpose)
              .subscribe(
                data => {
                  console.log(data['data']);
                  $('#likeIssue').addClass('active');
                  resolve({ like: false, dislike: true });
                },
                err => {
                  console.log(err);
                  reject({ like: this.activeTestL, dislike: this.activeTestD });
                }
              );

          }
        } else if (this.like === false && this.dislike === true) {
          // calling api to delete like and delete liker's id
          this.httpservice.likeDeleter(this.reporterInfo.userId, this.issueId, this.authToken, purpose)
            .subscribe(
              data1 => {
                console.log(data1['data1']);
                $('#likeIssue').removeClass('active');
                resolve({ like: false, dislike: false });
              },
              err => {
                console.log(err);
                reject({ like: this.activeTestL, dislike: this.activeTestD });
              }
            );
        }
      });




    };

    const func2 = (res): any => {
      this.dislike = res.dislike;
      this.like = res.like;
    };

    func1().then(func2);
  }

  /**
   * dislikeGenerate
   */
  public dislikeGenerate(purpose) {
    const func3 = (): any => {
      if (this.like === true && this.dislike === false) {

        return new Promise((resolve, reject) => {
          // calling api to delete dislike and delete disliker's id
          this.httpservice.dislikeDeleter(this.reporterInfo.userId, this.issueId, this.authToken, purpose)
            .subscribe(
              data1 => {
                console.log(data1['data1']);
                $('#dislikeIssue').removeClass('active');
                resolve({ like: false, dislike: false });
              },
              err => {
                console.log(err);
                reject({ like: this.activeTestL, dislike: this.activeTestD });
              }
            );
        });
      }


      return new Promise((resolve, reject) => {
        if (this.nand) {
          // when not first dislike click
          if (this.like === false && this.dislike === true) {

            // calling api to add dislike and update liker's id
            this.httpservice.dislikeGenerate(this.reporterInfo.userId, this.issueId, this.authToken, purpose)
              .subscribe(
                data => {
                  console.log(data['data']);
                  // calling api to delete like and delete liker's id
                  this.httpservice.likeDeleter(this.reporterInfo.userId, this.issueId, this.authToken, purpose)
                    .subscribe(
                      data1 => {
                        console.log(data1['data1']);
                        $('#dislikeIssue').addClass('active');
                        $('#likeIssue').removeClass('active');
                        resolve({ like: true, dislike: false });
                      },
                      err => {
                        console.log(err);
                        reject({ like: this.activeTestL, dislike: this.activeTestD });
                      }
                    );
                },
                err => {
                  console.log(err);
                  reject({ like: this.activeTestL, dislike: this.activeTestD });
                }
              );
          } else if (this.like === false && this.dislike === false) { // when first dislike click

            // calling api to add dislike and update liker's id
            this.httpservice.dislikeGenerate(this.reporterInfo.userId, this.issueId, this.authToken, purpose)
              .subscribe(
                data => {
                  console.log(data['data']);
                  $('#dislikeIssue').addClass('active');
                  resolve({ like: true, dislike: false });
                },
                err => {
                  console.log(err);
                  reject({ like: this.activeTestL, dislike: this.activeTestD });
                }
              );
          }
        } else if (this.like === true && this.dislike === false) {
          // calling api to delete dislike and delete disliker's id
          this.httpservice.dislikeDeleter(this.reporterInfo.userId, this.issueId, this.authToken, purpose)
            .subscribe(
              data1 => {
                console.log(data1['data1']);
                $('#dislikeIssue').removeClass('active');
                resolve({ like: false, dislike: false });
              },
              err => {
                console.log(err);
                reject({ like: this.activeTestL, dislike: this.activeTestD });
              }
            );
        }
      }
      );
    };

    const func4 = (res): any => {
      this.like = res.like;
      this.dislike = res.dislike;
    };

    func3().then(func4);
  }

}
