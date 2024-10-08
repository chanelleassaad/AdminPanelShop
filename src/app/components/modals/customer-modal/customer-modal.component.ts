import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContentTableComponent } from '../../content-table/content-table.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { passwordValidator } from '../../../../validators/password-validator';
import { IAddress, IOrder } from '../../../interfaces';
import { take } from 'rxjs';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
})
export class CustomerModalComponent {
  dialogRef = inject(MatDialogRef<ContentTableComponent>);
  customerForm: FormGroup;
  readonly data = inject<any>(MAT_DIALOG_DATA);

  hide = signal(true);

  errorMessage: string | null = null;

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

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSave() {
    let compareId = null;
    if (this.data) {
      compareId = this.data.id;
    }

    this.errorMessage = null;

    // Early return if the form is invalid
    if (!this.customerForm.valid) {
      return;
    }

    this.dataService.customers$.pipe(take(1)).subscribe((customers) => {
      //Make sure that it isn't comparing with itself
      const emailExists = customers.some(
        (c) => c.id !== compareId && c.email === this.customerForm.value.email,
      );
      const usernameExists = customers.some(
        (c) =>
          c.id !== compareId && c.username === this.customerForm.value.username,
      );

      if (emailExists) {
        this.errorMessage = 'Email already in use';
      } else if (usernameExists) {
        this.errorMessage = 'Username already in use';
      } else {
        const customerData = {
          id: compareId || undefined,
          ...this.customerForm.value,
        };

        if (compareId) {
          this.dataService.updateCustomer(customerData);
        } else {
          this.dataService.addCustomer(customerData);
        }

        this.dialogRef.close();
      }
    });
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
