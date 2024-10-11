import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatSuffix, MatError } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
    selector: 'app-customer-credentials',
    templateUrl: './customer-credentials.component.html',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatError
],
})
export class CustomerCredentialsComponent {
  @Input() customerForm!: FormGroup;
  @Input() errorMessage: string | null = null;
  @Output() saveChanges = new EventEmitter<void>();

  hide = signal(true);

  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
