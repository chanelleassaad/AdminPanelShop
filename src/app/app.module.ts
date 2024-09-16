import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { DetailsManagementComponent } from './pages/details-management/details-management.component';
import { ContentTableComponent } from './components/content-table/content-table.component';
import { CustomerModalComponent } from './components/modals/customer-modal/customer-modal.component';
import { ShopModalComponent } from './components/modals/shop-modal/shop-modal.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {
  MatDrawer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsManagementComponent,
    ContentTableComponent,
    CustomerModalComponent,
    ShopModalComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    NgOptimizedImage,
    MatDrawer,
    MatSidenavContent,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
