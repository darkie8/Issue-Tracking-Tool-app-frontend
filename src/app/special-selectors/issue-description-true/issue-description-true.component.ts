import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'issue-description-true',
  templateUrl: './issue-description-true.component.html',
  styleUrls: ['./issue-description-true.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IssueDescriptionTrueComponent implements OnInit {
  data1: TreeNode[];
  visibleSidebarfull;
  publishchFlow;
  selectedNode: TreeNode;
  constructor(private messageService: MessageService) { }

  ngOnInit() {

    this.data1 = [
      {
      label: 'Reporter',
      type: 'person',
      styleClass: 'ui-person',
      expanded: true,
      data: { name: 'Walter White', 'avatar': 'walter.jpg' },
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
    this.publishchFlow = event.node.data.parent;
    this.visibleSidebarfull = true;
    this.messageService.add({ severity: 'success', summary: 'Node Selected', detail: event.node.label });
  }

}
