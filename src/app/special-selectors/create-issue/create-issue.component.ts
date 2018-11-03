import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {
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

    sessionStorage.setItem('key', this.title + '' + this.description);
  }
}
