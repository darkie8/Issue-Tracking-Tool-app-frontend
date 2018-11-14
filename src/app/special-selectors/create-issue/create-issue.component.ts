import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { IssueTrackingServiceService } from 'src/app/issue-tracking-service.service';
import {ConfirmationService} from 'primeng/api';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class CreateIssueComponent implements OnInit {
  description: any;
  title: string;
  tag: string;
  uploadingFiles: any[] = [];
  uploaded: any[];
  uploadedString: string;
  authtoken = Cookie.get('authToken');
  uploading: any[];
  uploadedFiles: any[] = [];
  uploadingString: string;
  reporter: string;
  constructor(private messageService: MessageService,
    private httpservice: IssueTrackingServiceService,
    private Confirmation: ConfirmationService) { }

  onSelect(event) {
    // tslint:disable-next-line:prefer-const
    for (let file of event.files) {
      this.uploadingFiles.push(file);
      this.uploading = [...this.uploadingFiles];
      const uploadingNames = this.uploading.map(file1 => file1.name);
      this.uploadingString = this.httpservice.convertTostring(uploadingNames);
      console.log(file.name);
      sessionStorage.setItem('length', JSON.stringify(this.uploading.length));
      sessionStorage.setItem(`${this.uploading.indexOf(file)}`, file.name);
      this.reporter = Cookie.get('receiverName');
    }
  }



  onUpload(event) {
    // tslint:disable-next-line:prefer-const
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    const response = Promise.resolve(event.xhr.response);
    response.then((value) => {
      console.log(value);
      sessionStorage.setItem('imagefolder', value);
      this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    });

  }


  ngOnInit() {
  }

  /**
   * submit
   */
  submit = (): any => {
    if (!this.title) {
      this.messageService.add({
        key: 'title',
        severity: 'warn',
        summary: 'Title missing',
        detail: 'mention title'
      });

    } else if (!this.tag) {
      this.messageService.add({
        key: 'tag',
        severity: 'warn',
        summary: 'tags missing',
        detail: 'mention tags'
      });
    } else if (!this.description) {
      this.messageService.add({
        key: 'desciption',
        severity: 'warn',
        summary: 'Description missing',
        detail: 'mention description'
      });
    } else {

      const uploadedString1 = this.uploadedFiles.map(obj => obj.name);
      const uploadedString2 = this.httpservice.convertTostring(uploadedString1);
      const data = (uploadedString1) ? {
        auth: this.authtoken,
        details: {
          title: this.title,
          tags: this.tag,
          description: this.description,
          reporter: Cookie.get('receiverName'),
          files: uploadedString2,
          imagefolder: sessionStorage.getItem('imagefolder')
        }
      } :
        {
          auth: this.authtoken,
          details: {
            title: this.title,
            tags: this.tag,
            description: this.description,
            reporter: Cookie.get('receiverName'),
            files: ''
          }
        };
      this.httpservice.createIssue(data).subscribe(
        data1 => {
          if (data1['status'] === 200) {

            this.messageService.add({
              key: 'submit',
              severity: 'info',
              summary: 'Submission done',
              detail: 'Submission has been done and app is redirected to personal dashboard'
            });
          }

          sessionStorage.setItem('key', this.title + '' + this.description);


        },
        err => {
          console.log('error');
          this.messageService.add({
            key: 'error',
            severity: 'error',
            summary: 'submission failed',
            detail: 'Could not submit data'
          });
        }
      );


    }


  }
  confirm() {
    this.Confirmation.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
         this.submit();
        },
        reject: () => {
          this.messageService.add({
            key: 'error',
            severity: 'warn',
            summary: 'Submission aborted',
            detail: 'Could not submit data'
          });
        }
    });
}

}
