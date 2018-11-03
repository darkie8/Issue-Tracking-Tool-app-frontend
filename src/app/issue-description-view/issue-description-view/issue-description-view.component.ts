import { Component, OnInit } from '@angular/core';
import { NavbarComponentComponent } from './../../special-selectors/navbar-component/navbar-component.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
declare var $: any;


@Component({
  selector: 'app-issue-description-view',
  templateUrl: './issue-description-view.component.html',
  styleUrls: ['./issue-description-view.component.css'],
  providers: [MessageService]
})
export class IssueDescriptionViewComponent implements OnInit {

  typeroute: string;



  constructor(private routeend: ActivatedRoute) { }



  ngOnInit() {

    this.typeroute = this.routeend.snapshot.paramMap.get('type');


  }




}
