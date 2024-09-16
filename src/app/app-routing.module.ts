import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailsManagementComponent } from './pages/details-management/details-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/candy-shop/login', pathMatch: 'full' },
  {
    path: 'candy-shop',
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'details-management',
        component: DetailsManagementComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
