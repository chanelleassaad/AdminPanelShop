import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatNavList, MatListItem } from '@angular/material/list';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    NgClass,
    MatSidenavContent,
    RouterOutlet
],
})
export class AppComponent {
  private router = inject(Router);

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

  protected readonly localStorage = localStorage;

  signOut() {
    this.router.navigate(['candy-shop/login']);
    localStorage.removeItem('currentUser');
  }

  navigateTo(route: string, drawer: MatDrawer) {
    this.router.navigate(['candy-shop/' + route]).then(() => {
      drawer.close(); // close the drawer after successful navigation
    });
  }
}
