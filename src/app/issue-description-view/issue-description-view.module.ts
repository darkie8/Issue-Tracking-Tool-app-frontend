import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueDescriptionViewComponent } from './issue-description-view/issue-description-view.component';
import { SpecialSelectorsModule } from '../special-selectors/special-selectors.module';
import { CreateIssueComponent } from '../special-selectors/create-issue/create-issue.component';
import {EditorModule} from 'primeng/editor';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
@NgModule({
  imports: [
    CommonModule,
     SpecialSelectorsModule,
      EditorModule,
       ButtonModule,
        FormsModule,
         ReactiveFormsModule,
         FileUploadModule,
         ToastModule
  ],
  declarations: [IssueDescriptionViewComponent], schemas: [NO_ERRORS_SCHEMA]
})
export class IssueDescriptionViewModule { }
