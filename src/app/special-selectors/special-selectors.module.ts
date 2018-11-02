import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
@NgModule({
  imports: [
    CommonModule,
    EditorModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule
  ],
  declarations: [NavbarComponentComponent, CreateIssueComponent],
  exports: [
    NavbarComponentComponent, CreateIssueComponent
  ]
})
export class SpecialSelectorsModule { }
