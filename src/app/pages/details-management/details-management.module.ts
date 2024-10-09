import { NgModule } from '@angular/core';
import { DetailsManagementComponent } from './details-management.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ContentTableComponent } from '../../components/content-table/content-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {
  MatError,
  MatFormField,
  MatInput,
  MatSuffix,
} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerModalComponent } from '../../components/modals/customer-modal/customer-modal.component';
import { ShopModalComponent } from '../../components/modals/shop-modal/shop-modal.component';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatLabel } from '@angular/material/form-field';
import { CustomerDetailsComponent } from '../../components/customer-details/customer-details.component';

@NgModule({
  declarations: [
    DetailsManagementComponent,
    ContentTableComponent,
    CustomerModalComponent,
    ShopModalComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatInput,
    FormsModule,
    MatIconButton,
    MatPaginator,
    MatSort,
    MatFormField,
    MatDialogTitle,
    MatDialogContent,
    MatError,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    MatSlideToggle,
    MatCheckboxModule,
    MatDialogClose,
    MatOption,
    MatLabel,
    MatSelect,
    MatSuffix,
  ],
})
export class DetailsManagementModule {}
