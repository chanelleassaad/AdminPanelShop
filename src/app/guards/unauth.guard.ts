import { CanActivate, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
  private router = inject(Router);


  canActivate(): boolean {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.router.navigate(['/candy-shop/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
