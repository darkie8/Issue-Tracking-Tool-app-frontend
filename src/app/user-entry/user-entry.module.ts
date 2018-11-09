import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {PasswordModule} from 'primeng/password';
import { ToastModule } from 'primeng/toast';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    PasswordModule,
    ToastModule,
    RouterModule.forChild([{path: 'register', component: RegisterComponent}])
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class UserEntryModule { }
