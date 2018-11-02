import { Component, OnInit } from '@angular/core';
import { NavbarComponentComponent } from './../../special-selectors/navbar-component/navbar-component.component';
import { MessageService } from 'primeng/components/common/messageservice';
declare var $: any;


@Component({
  selector: 'app-issue-description-view',
  templateUrl: './issue-description-view.component.html',
  styleUrls: ['./issue-description-view.component.css'],
  providers: [MessageService]
})
export class IssueDescriptionViewComponent implements OnInit {
  description: any;
  title: string;
  tag: string;
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) { }

  onUpload(event) {
    // tslint:disable-next-line:prefer-const
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }


  ngOnInit() {
  }

  /**
   * submit
   */
  public submit() {

    console.log(this.title + '' + this.description);
  }

}
