import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalizedDashboardViewComponent } from './dashboard/personalized-dashboard-view/personalized-dashboard-view.component';
import { LoginComponent } from './user-entry/login/login.component';
import { IssueDescriptionViewComponent } from './issue-description-view/issue-description-view/issue-description-view.component';

const routes: Routes = [{ path: 'login', component: LoginComponent, pathMatch: 'full' },
{ path: '', component: LoginComponent },
{ path: '*', component: LoginComponent },
{ path: 'dashboard/:userid', component: PersonalizedDashboardViewComponent, pathMatch: 'full' },
{ path: 'issue_description/:type/:issueid', component: IssueDescriptionViewComponent, pathMatch: 'full' },
{path: 'issue_description/:type', component: IssueDescriptionViewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
