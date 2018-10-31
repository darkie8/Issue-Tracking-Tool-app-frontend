import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalizedDashboardViewComponent } from './personalized-dashboard-view/personalized-dashboard-view.component';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SidebarModule } from 'primeng/sidebar';
@NgModule({
  imports: [
    CommonModule, SlideMenuModule, SidebarModule
  ],
  declarations: [PersonalizedDashboardViewComponent]
})
export class DashboardModule { }
