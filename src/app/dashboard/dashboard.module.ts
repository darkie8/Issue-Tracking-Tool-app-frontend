import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalizedDashboardViewComponent } from './personalized-dashboard-view/personalized-dashboard-view.component';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SidebarModule } from 'primeng/sidebar';
import { SpecialSelectorsModule } from '../special-selectors/special-selectors.module';
import { NavbarComponentComponent } from '../special-selectors/navbar-component/navbar-component.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
  imports: [
    CommonModule, OrderModule, PaginatorModule, SlideMenuModule, SidebarModule, ToastModule, SpecialSelectorsModule, ButtonModule
  ],
  declarations: [PersonalizedDashboardViewComponent]
})
export class DashboardModule { }
