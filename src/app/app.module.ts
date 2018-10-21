import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchViewModule } from './search-view/search-view.module';
import { UserEntryModule } from './user-entry/user-entry.module';
import { SpecialSelectorsModule } from './special-selectors/special-selectors.module';
import { IssueDescriptionViewModule } from './issue-description-view/issue-description-view.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './user-entry/login/login.component';
import { HttpClient } from 'selenium-webdriver/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SearchViewModule,
    UserEntryModule,
    SpecialSelectorsModule,
    IssueDescriptionViewModule,
    DashboardModule,
    RouterModule.forRoot([{path: 'login' , component: LoginComponent, pathMatch: 'full'},
    { path: '', component: LoginComponent },
    { path: '*', component: LoginComponent }], {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
