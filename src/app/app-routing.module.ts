import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailsManagementComponent } from './pages/details-management/details-management.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UnauthGuard } from './guards/unauth.guard';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'candy-shop/login',
    pathMatch: 'full',
  },
  {
    path: 'candy-shop',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [UnauthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'details-management',
        component: DetailsManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'details-management/:label',
        component: DetailsManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'details-management/customer-details/:id',
        component: CustomerDetailsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'candy-shop/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
