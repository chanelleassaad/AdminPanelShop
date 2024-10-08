import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { DetailsManagementModule } from './pages/details-management/details-management.module';
import { LoginModule } from './pages/login/login.module';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import {
  MatDrawer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    DashboardModule,
    LoginModule,
    DetailsManagementModule,
    MatDrawer,
    MatSidenavContent,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatToolbar,
    MatIcon,
    MatIconButton,
    BrowserAnimationsModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
