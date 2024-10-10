import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { passwordValidator } from '../../../validators/password-validator';
import { IAddress, IOrder } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
})
export class CustomerDetailsComponent {
  customerForm!: FormGroup;
  errorMessage: string | null = null;
  customerId: string | null;
  customerName: string | undefined;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.customerId = this.route.snapshot.paramMap.get('id');

    this.customerForm = this.createCustomerForm();
    console.log(this.customerId);
    if (this.customerId) this.loadCustomerData(this.customerId);
  }

  private createCustomerForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
      addresses: this.fb.array([this.createAddressGroup()]),
      orders: this.fb.array([]),
    });
  }

  private createAddressGroup(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  get orders(): FormArray {
    return this.customerForm.get('orders') as FormArray;
  }
  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  private loadCustomerData(id: string): void {
    this.dataService.getCustomerById(id).subscribe((customer) => {
      if (customer) {
        this.customerForm.patchValue(customer);
        this.customerName = customer.name;
        this.setAddresses(customer.addresses || []);
        this.setOrders(customer.orders || []);
      }
    });
  }

  private setAddresses(addresses: IAddress[]): void {
    const addressArray = this.fb.array(
      addresses.map((address) =>
        this.fb.group({
          street: [address.street, Validators.required],
          city: [address.city, Validators.required],
          zip: [address.zip, Validators.required],
        }),
      ),
    );
    this.customerForm.setControl('addresses', addressArray);
  }

  private setOrders(orders: IOrder[]): void {
    const orderArray = this.fb.array(
      orders.map((order) => this.fb.group(order)),
    );
    this.customerForm.setControl('orders', orderArray);
  }

  onSave(): void {
    if (this.customerForm.invalid) {
      this.openSnackbar(
        'ERROR: Please fill in all required fields correctly.',
        'Close',
      );
      return;
    }
    this.dataService.customers$.pipe(take(1)).subscribe((customers) => {
      const { email, username } = this.customerForm.value;
      const emailExists = customers.some(
        (c) => Number(c.id) !== Number(this.customerId) && c.email === email,
      );
      const usernameExists = customers.some(
        (c) =>
          Number(c.id) !== Number(this.customerId) && c.username === username,
      );

      if (emailExists || usernameExists) {
        this.errorMessage = emailExists
          ? 'Email already in use'
          : 'Username already in use';
        this.openSnackbar(
          'ERROR: Please fill in all required fields correctly.',
          'Close',
        );
      } else {
        const customerData = {
          id: this.customerId || undefined,
          ...this.customerForm.value,
        };
        this.dataService.updateCustomer(customerData);
        this.openSnackbar('Customer data saved successfully!', 'Close');
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['candy-shop/details-management/customers']);
  }

  openSnackbar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
