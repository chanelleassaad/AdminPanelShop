import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-addresses',
  templateUrl: './customer-addresses.component.html',
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
