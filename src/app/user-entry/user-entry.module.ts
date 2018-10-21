import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng6-toastr';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule.forRoot(),
    RouterModule.forChild([{path: 'register', component: RegisterComponent}])
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class UserEntryModule { }
