import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'azsft';

  constructor(private router: Router) {}

  signOut() {
    this.router.navigate(['candy-shop/login']);
    localStorage.removeItem('currentUser');
  }

  protected readonly localStorage = localStorage;
}
