import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContentTableComponent } from '../../content-table/content-table.component';
import { DataService } from '../../../services/data.service';
import { IProduct } from '../../../interfaces';

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.component.html',
  styleUrl: './shop-modal.component.css',
})
export class ShopModalComponent {
  shopForm: FormGroup;
  products: IProduct[] = [];
  readonly data = inject<any>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ContentTableComponent>);

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
  ) {
    this.shopForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name],
      image: [this.data.image],
      open: [this.data.open],
      currency: [this.data.currency],
      products: [this.data.products],
    });

    this.getProducts();
  }

  getProducts() {
    this.dataService.products$.subscribe((products: any[]) => {
      this.products = products;
    });
  }

  isProductChecked(productId: number): boolean {
    return this.shopForm.value.products.includes(productId);
  }

  toggleProduct(productId: number, checked: boolean) {
    const selectedProducts = [...this.shopForm.value.products];

    if (checked) {
      // Add product if checked
      if (!selectedProducts.includes(productId)) {
        selectedProducts.push(productId);
      }
    } else {
      // Remove product if unchecked
      const index = selectedProducts.indexOf(productId);
      if (index > -1) {
        selectedProducts.splice(index, 1);
      }
    }

    this.shopForm.patchValue({ products: selectedProducts });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSave() {
    this.dataService.updateShop(this.shopForm.value);
    this.dialogRef.close(this.shopForm.value); // Pass new data to parent
  }
}
