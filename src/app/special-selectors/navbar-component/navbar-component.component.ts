import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {

  @Input() input1e: any;
  page_name: any;
  constructor() { }

  ngOnInit() {
    this.page_name = this.input1e;

  }

  /**
   * logOut of the system
   */
  public logOut() {

  }
  /**
   * goTosearchView
   */
  public goTosearchView() {

  }

}
