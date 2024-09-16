import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'azsft';
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: 'dashboard',
      indent: false,
    },
    {
      label: 'Details Management',
      icon: 'settings',
      route: 'details-management',
      indent: false,
    },
    {
      label: 'Customers',
      icon: 'person',
      route: 'details-management/customers',
      indent: true,
    },
    {
      label: 'Shops',
      icon: 'store',
      route: 'details-management/shops',
      indent: true,
    },
    {
      label: 'Orders',
      icon: 'shopping_cart',
      route: 'details-management/orders',
      indent: true,
    },
  ];

  constructor(private router: Router) {}

  signOut() {
    this.router.navigate(['candy-shop/login']);
    localStorage.removeItem('currentUser');
  }

  navigateTo(route: string, drawer: MatDrawer) {
    this.router.navigate(['candy-shop/' + route]).then(() => {
      drawer.close(); // close the drawer after successful navigation
    });
  }

  protected readonly localStorage = localStorage;
}
