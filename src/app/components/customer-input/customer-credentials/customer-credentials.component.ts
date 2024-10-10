import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-credentials',
  templateUrl: './customer-credentials.component.html',
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
