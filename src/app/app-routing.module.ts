import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

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
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        canActivate: [UnauthGuard],
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'details-management',
        loadComponent: () =>
          import(
            './pages/details-management/details-management.component'
          ).then((m) => m.DetailsManagementComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'details-management/:label',
        loadComponent: () =>
          import(
            './pages/details-management/details-management.component'
          ).then((m) => m.DetailsManagementComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'details-management/customer-details/:id',
        loadComponent: () =>
          import(
            './components/customer-details/customer-details.component'
          ).then((m) => m.CustomerDetailsComponent),
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
