import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailsManagementComponent } from './pages/details-management/details-management.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'candy-shop',
    redirectTo: 'candy-shop/login',
    pathMatch: 'full',
  },
  {
    path: 'candy-shop',
    children: [
      {
        path: 'login',
        component: LoginComponent,
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
