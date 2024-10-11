import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatFormField, MatInput, MatError, MatSuffix } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';

import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
    MatCard,
    MatTabGroup,
    MatTab,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatCardActions,
    MatButton
],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  hide = signal(true);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (user) => {
          if (user) {
            // Save user data in local storage
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['candy-shop/dashboard']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        () => {
          this.errorMessage = 'An error occurred during login';
        },
      );
    }
  }
}
