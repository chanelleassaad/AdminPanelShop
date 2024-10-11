import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

// Guard: Determines if a route can be activated and allows navigation based on certain conditions
export class AuthGuard implements CanActivate {
  private router = inject(Router);


  canActivate(): boolean {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
