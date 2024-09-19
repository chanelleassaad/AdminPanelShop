import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContentTableComponent } from '../../content-table/content-table.component';
import { DataService } from '../../../services/data.service';
import { IAddOn, IProduct, IShop } from '../../../interfaces';

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.component.html',
  styleUrls: ['./shop-modal.component.css'],
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
      products: this.fb.array([]),
    });

    this.getProducts();
    this.initProducts();
  }

  getProducts() {
    this.dataService.products$.subscribe((products: IProduct[]) => {
      this.products = products;
      this.initProducts();
    });
  }

  initProducts() {
    const productsArray = this.shopForm.get('products') as FormArray;
    productsArray.clear(); // clear existing products if any

    this.data.products.forEach((product: any) => {
      const productAddOns = this.fb.group({
        productId: [product.productId],
        selectedAddOns:
          this.fb.array(
            product.addOns.map((addOn: IAddOn) => this.fb.control(addOn)),
          ) || [],
      });
      productsArray.push(productAddOns);
    });
  }

  isProductChecked(productId: number): boolean {
    const products = this.shopForm.value.products as { productId: number }[];
    return products.some((product) => product.productId === productId);
  }

  isAddOnChecked(productId: number, addOnId: number): boolean {
    const products = this.shopForm.value.products as {
      productId: number;
      selectedAddOns: number[];
    }[];

    // find the product with the specified productId
    const product = products.find((p) => p.productId === productId);

    // return whether the addOnId is included in the selectedAddOns of the found product
    return product ? product.selectedAddOns.includes(addOnId) : false;
  }

  toggleProduct(productId: number, checked: boolean) {
    const productsArray = this.shopForm.get('products') as FormArray;

    // find the FormGroup for the specific productId
    const productControl = productsArray.controls.find(
      (control) => (control as FormGroup).get('productId')?.value === productId,
    ) as FormGroup;

    if (productControl) {
      // if !checked, remove the product and clear its add-ons
      if (!checked) {
        productsArray.removeAt(productsArray.controls.indexOf(productControl));
      }
    } else if (checked) {
      // if checked, add the product with empty add-ons
      const newProductControl = this.fb.group({
        productId: [productId],
        selectedAddOns: this.fb.array([]),
      });
      productsArray.push(newProductControl);
    }
  }

  toggleAddOn(productId: number, addOnId: number, checked: boolean) {
    const productsArray = this.shopForm.get('products') as FormArray;

    // find the FormGroup for the specific productId
    const productControl = productsArray.controls.find(
      (control) => (control as FormGroup).get('productId')?.value === productId,
    ) as FormGroup;

    if (productControl) {
      const selectedAddOns = productControl.get('selectedAddOns') as FormArray;

      if (checked) {
        // add the add-on if checked
        selectedAddOns.push(this.fb.control(addOnId));
      } else {
        // remove the add-on if unchecked
        const index = selectedAddOns.controls.findIndex(
          (control) => control.value === addOnId,
        );
        if (index > -1) {
          selectedAddOns.removeAt(index);
        }
      }
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
  onSave() {
    const updatedShop: IShop = {
      id: this.shopForm.value.id,
      name: this.shopForm.value.name,
      image: this.shopForm.value.image,
      open: this.shopForm.value.open,
      currency: this.shopForm.value.currency,
      products: this.shopForm.value.products.map((product: any) => ({
        productId: product.productId,
        addOns: product.selectedAddOns,
      })),
    };

    this.dataService.updateShop(updatedShop);
    this.dialogRef.close(updatedShop);
  }
}
