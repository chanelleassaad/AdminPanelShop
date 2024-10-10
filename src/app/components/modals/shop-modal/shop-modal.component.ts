import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContentTableComponent } from '../../content-table/content-table.component';
import { DataService } from '../../../services/data.service';
import { IAddOn, IProduct, IShop } from '../../../interfaces';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.component.html',
})
export class ShopModalComponent implements OnInit, OnDestroy {
  shopForm: FormGroup;
  products: IProduct[] = [];
  selectedProducts: FormControl<number[]> = new FormControl<number[]>([], {
    nonNullable: true,
  });
  productSearchCtrl: FormControl<string> = new FormControl<string>('', {
    nonNullable: true,
  });
  filteredProductsMulti: ReplaySubject<IProduct[]> = new ReplaySubject<
    IProduct[]
  >(1);
  protected _onDestroy = new Subject<void>();
  readonly data = inject<any>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ContentTableComponent>);
  protected readonly Number = Number;

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
  }

  ngOnInit() {
    const selectedProductIds = this.data.products.map(
      (product: any) => product.productId,
    );

    this.selectedProducts.setValue(selectedProductIds);
    this.initializeProducts();

    this.filteredProductsMulti.next(this.products.slice());
    this.productSearchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProductsMulti();
      });

    // Sync FormArray with selected products
    this.selectedProducts.valueChanges.subscribe(
      (selectedProductIds: number[]) => {
        this.syncProductsArray(selectedProductIds);
      },
    );
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  // Sync selected products with FormArray
  syncProductsArray(selectedProductIds: number[]) {
    const productsArray = this.shopForm.get('products') as FormArray;

    const existingProductIds = new Set(
      productsArray.controls.map((control) => control.get('productId')?.value),
    );

    selectedProductIds.forEach((productId) => {
      if (!existingProductIds.has(productId)) {
        const product = this.products.find((p) => Number(p.id) === productId);
        if (product) {
          const productAddOns = this.fb.group({
            productId: [Number(product.id)],
            selectedAddOns: this.fb.array([]),
          });
          productsArray.push(productAddOns);
        }
      }
    });

    productsArray.controls.forEach((control, index) => {
      const productId = control.get('productId')?.value;
      if (!selectedProductIds.includes(productId)) {
        productsArray.removeAt(index);
      }
    });
  }

  initializeProducts() {
    this.dataService.products$.subscribe((products: IProduct[]) => {
      this.products = products;
      const productsArray = this.shopForm.get('products') as FormArray;
      productsArray.clear();

      this.data.products.forEach((product: any) => {
        const productAddOns = this.fb.group({
          productId: [product.productId],
          selectedAddOns: this.fb.array(
            product.addOns.map((addOn: IAddOn) => this.fb.control(addOn)),
          ),
        });
        productsArray.push(productAddOns);
      });

      // Set the selected product IDs to the selectedProducts
      const selectedProductIds: number[] = this.data.products.map(
        (product: any) => product.productId,
      );
      this.selectedProducts.setValue(selectedProductIds);
    });
  }

  // Get product name by ID
  getProductName(productId: number): string {
    const product = this.products.find((p) => Number(p.id) === productId);
    return product ? product.productName : '';
  }

  //AddOns Functions
  isAddOnChecked(productId: number, addOnId: number): boolean {
    const products = this.shopForm.value.products as {
      productId: number;
      selectedAddOns: number[];
    }[];
    const product = products.find((p) => Number(p.productId) === productId);
    return product ? product.selectedAddOns.includes(addOnId) : false;
  }
  getAddOns(productId: number): IAddOn[] {
    const product = this.products.find((p) => Number(p.id) === productId);
    return product ? product.addOns : [];
  }
  toggleAddOn(productId: number, addOnId: number, checked: boolean) {
    const productsArray = this.shopForm.get('products') as FormArray;
    const productControl = productsArray.controls.find(
      (control) => (control as FormGroup).get('productId')?.value === productId,
    ) as FormGroup;

    if (productControl) {
      const selectedAddOns = productControl.get('selectedAddOns') as FormArray;
      if (checked) {
        selectedAddOns.push(this.fb.control(addOnId));
      } else {
        const index = selectedAddOns.controls.findIndex(
          (control) => control.value === addOnId,
        );
        if (index > -1) {
          selectedAddOns.removeAt(index);
        }
      }
    }
  }

  // Filter products
  protected filterProductsMulti() {
    if (!this.products) {
      return;
    }
    // get the search keyword
    let search = this.productSearchCtrl.value;
    if (!search) {
      this.filteredProductsMulti.next(this.products.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the products
    this.filteredProductsMulti.next(
      this.products.filter((product) =>
        product.productName.toLowerCase().includes(search),
      ),
    );
  }

  // Buttons Functions
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
