import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'app-customer-addresses',
    templateUrl: './customer-addresses.component.html',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton
],
})
export class CustomerAddressesComponent {
  @Input() customerForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  private createAddressGroup(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

  deleteAddress(index: number): void {
    this.addresses.removeAt(index);
  }
}
