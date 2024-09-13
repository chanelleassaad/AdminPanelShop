import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (user) => {
          if (user) {
            // Save user data in local storage
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['candy-shop/dashboard']);
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        () => {
          this.errorMessage = 'An error occurred during login';
        },
      );
    }
  }
}
