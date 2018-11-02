import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalizedDashboardViewComponent } from './personalized-dashboard-view/personalized-dashboard-view.component';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SidebarModule } from 'primeng/sidebar';
import { SpecialSelectorsModule } from '../special-selectors/special-selectors.module';
import { NavbarComponentComponent } from '../special-selectors/navbar-component/navbar-component.component';
import {ButtonModule} from 'primeng/button';
@NgModule({
  imports: [
    CommonModule, SlideMenuModule, SidebarModule, SpecialSelectorsModule, ButtonModule
  ],
  declarations: [PersonalizedDashboardViewComponent]
})
export class DashboardModule { }
