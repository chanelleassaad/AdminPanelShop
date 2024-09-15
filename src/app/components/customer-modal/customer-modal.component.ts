import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContentTableComponent } from '../content-table/content-table.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { passwordValidator } from '../../../validators/password-validator';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrl: './customer-modal.component.css',
})
export class CustomerModalComponent {
  dialogRef = inject(MatDialogRef<ContentTableComponent>);
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
      addresses: this.fb.array([
        this.fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          zip: ['', Validators.required],
        }),
      ]),
      orders: [[]],
    });
  }
  onNoClick() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      this.dataService.addCustomer(this.customerForm.value);
    }
  }

  // Address methods to display and add several addresses
  get addresses() {
    return this.customerForm.get('addresses') as FormArray;
  }

  addAddress() {
    const addresses = this.customerForm.get('addresses') as FormArray;
    addresses.push(
      this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', Validators.required],
      }),
    );
  }
}
