import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'app-customer-orders',
    templateUrl: './customer-orders.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgFor,
        MatFormField,
        MatLabel,
        MatInput,
    ],
})
export class CustomerOrdersComponent {
  @Input() customerForm!: FormGroup;

  get orders(): FormArray {
    return this.customerForm.get('orders') as FormArray;
  }
}
