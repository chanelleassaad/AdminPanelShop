import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { ContentTableComponent } from '../../content-table/content-table.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { passwordValidator } from '../../../../validators/password-validator';
import { take } from 'rxjs';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { CustomerCredentialsComponent } from '../../customer-input/customer-credentials/customer-credentials.component';
import { CustomerAddressesComponent } from '../../customer-input/customer-addresses/customer-addresses.component';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-customer-modal',
    templateUrl: './customer-modal.component.html',
    standalone: true,
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        CustomerCredentialsComponent,
        CustomerAddressesComponent,
        MatDialogActions,
        MatButton,
    ],
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
      orders: this.fb.array([]),
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSave() {
    this.errorMessage = null;

    // Early return if the form is invalid
    if (!this.customerForm.valid) {
      return;
    }

    this.dataService.customers$.pipe(take(1)).subscribe((customers) => {
      //Make sure that it isn't comparing with itself
      const emailExists = customers.some(
        (c) => c.email === this.customerForm.value.email,
      );
      const usernameExists = customers.some(
        (c) => c.username === this.customerForm.value.username,
      );

      if (emailExists) {
        this.errorMessage = 'Email already in use';
      } else if (usernameExists) {
        this.errorMessage = 'Username already in use';
      } else {
        const customerData = {
          id: undefined,
          ...this.customerForm.value,
        };

        this.dataService.addCustomer(customerData);
        this.dialogRef.close();
      }
    });
  }

  // Address methods to display/add/delete several addresses
  get addresses() {
    return this.customerForm.get('addresses') as FormArray;
  }
}
