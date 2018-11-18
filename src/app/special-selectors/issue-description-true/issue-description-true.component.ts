import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'issue-description-true',
  templateUrl: './issue-description-true.component.html',
  styleUrls: ['./issue-description-true.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IssueDescriptionTrueComponent implements OnInit, OnChanges {
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
  // tslint:disable-next-line:max-line-length
  items: ({ label: string; icon: string; command: () => void; url?: undefined; routerLink?: undefined; } | { label: string; icon: string; url: string; command?: undefined; routerLink?: undefined; } | { label: string; icon: string; routerLink: string[]; command?: undefined; url?: undefined; })[];
  tags: any;
  description: any;
  label: any;
  createdOn: any;
  modifiedOn: any;
  constructor(private messageService: MessageService,
    private httpservice: IssueTrackingServiceService,
    private sanitizer:DomSanitizer) { }

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
    this.tags = this.issueTotal.tags;
    this.description = this.sanitizer.bypassSecurityTrustHtml(this.issueTotal.description);
    this.label = event.node.label;
    this.createdOn = this.issueTotal.createdOn;
    this.modifiedOn = this.issueTotal.modifiedOn;
    console.log(this.issueTotal);

  }

  save() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Data Saved' });
  }

  update() {
    this.messageService.add({key: 'updated',severity: 'info', summary: 'Success', detail: 'Tags Updated' });
  }

  delete() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Data Deleted' });
  }

}
