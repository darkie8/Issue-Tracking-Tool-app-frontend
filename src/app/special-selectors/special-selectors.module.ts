import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { IssueDescriptionTrueComponent } from './issue-description-true/issue-description-true.component';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {SidebarModule} from 'primeng/sidebar';
@NgModule({
  imports: [
    CommonModule,
    EditorModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule,
    OrganizationChartModule,
    SidebarModule
  ],
  declarations: [NavbarComponentComponent, CreateIssueComponent, IssueDescriptionTrueComponent],
  exports: [
    NavbarComponentComponent, CreateIssueComponent, IssueDescriptionTrueComponent
  ]
})
export class SpecialSelectorsModule { }
