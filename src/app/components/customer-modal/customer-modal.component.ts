import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContentTableComponent } from '../content-table/content-table.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { passwordValidator } from '../../../validators/password-validator';
import { IAddress, IOrder } from '../../../models/interfaces';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrl: './customer-modal.component.css',
})
export class CustomerModalComponent {
  dialogRef = inject(MatDialogRef<ContentTableComponent>);
  customerForm: FormGroup;
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
  ) {
    this.customerForm = this.fb.group({
      name: [this.data ? this.data.name : '', Validators.required],
      username: [this.data ? this.data.username : '', Validators.required],
      email: [
        this.data ? this.data.email : '',
        [Validators.required, Validators.email],
      ],
      password: [
        this.data ? this.data.password : '',
        [Validators.required, passwordValidator()],
      ],
      addresses: this.fb.array(
        this.data?.addresses?.map((address: IAddress) =>
          this.fb.group({
            street: [address.street || ''],
            city: [address.city || ''],
            zip: [address.zip || ''],
          }),
        ) || [
          this.fb.group({
            street: [''],
            city: [''],
            zip: [''],
          }),
        ],
      ),
      orders: this.fb.array(
        this.data?.orders?.map((order: IOrder) =>
          this.fb.group({
            orderId: [order.orderId || ''],
            date: [order.date || ''],
            total: [order.total || ''],
            status: [order.status || ''],
          }),
        ) || [],
      ),
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.customerForm.valid) {
      // FIX: on edit doesn't update data automatically
      if (this.data) {
        this.dataService.updateCustomer({
          id: this.data.id,
          ...this.customerForm.value,
        });
      } else {
        this.dataService.addCustomer(this.customerForm.value);
      }
    }
  }

  get orders() {
    return this.customerForm.get('orders') as FormArray;
  }

  // Address methods to display/add/delete several addresses
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
  deleteAddress(index: number): void {
    this.addresses.removeAt(index);
  }
}
