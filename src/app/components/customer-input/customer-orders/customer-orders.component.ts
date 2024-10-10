import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
})
export class CustomerOrdersComponent {
  @Input() customerForm!: FormGroup;

  get orders(): FormArray {
    return this.customerForm.get('orders') as FormArray;
  }
}
