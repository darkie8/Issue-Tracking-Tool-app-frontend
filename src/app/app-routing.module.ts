import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalizedDashboardViewComponent } from './dashboard/personalized-dashboard-view/personalized-dashboard-view.component';
import { LoginComponent } from './user-entry/login/login.component';

const routes: Routes = [{ path: 'login', component: LoginComponent, pathMatch: 'full' },
{ path: '', component: LoginComponent },
{ path: '*', component: LoginComponent },
{ path: 'dashboard/:userid', component: PersonalizedDashboardViewComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
