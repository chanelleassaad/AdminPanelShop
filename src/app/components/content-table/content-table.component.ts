import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CustomerModalComponent } from '../modals/customer-modal/customer-modal.component';
import { ShopModalComponent } from '../modals/shop-modal/shop-modal.component';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-content-table',
    templateUrl: './content-table.component.html',
    standalone: true,
    imports: [
    MatIcon,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatInput,
    FormsModule,
    MatIconButton,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
    TitleCasePipe
],
})
export class ContentTableComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  @Input() label = ''; // 'Customers', 'Shops', 'Orders'

  // Use MatTableDataSource instead of a plain array for data source
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];
  displayedColumnsWithActions: string[] = [];

  data$: Observable<any[]> = of([]);

  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // fetch data based on which tab is selected
    switch (this.label) {
      case 'Customers':
        this.data$ = this.dataService.customers$;
        this.data$.subscribe((data) => {
          this.dataSource.data = data;
          this.setDisplayedColumns();
        });
        break;

      case 'Shops':
        this.data$ = this.dataService.shops$;
        this.data$.subscribe((data) => {
          this.dataSource.data = data;
          this.setDisplayedColumns();
        });
        break;

      case 'Orders':
        this.data$ = this.dataService.customers$.pipe(
          map((customers) => customers.flatMap((customer) => customer.orders)),
        );
        this.data$.subscribe((orders) => {
          this.dataSource.data = orders;
          this.setDisplayedColumns();
        });
        break;

      default:
        console.warn('Unknown label:', this.label);
        break;
    }
  }

  // table column names
  setDisplayedColumns(): void {
    if (this.dataSource.data.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource.data[0]).filter(
        (column) => column !== 'image' && column !== 'password',
      );
      this.displayedColumnsWithActions = [...this.displayedColumns, 'actions'];
    }

    // Connect the paginator to the dataSource
    this.dataSource.paginator = this.paginator;
  }

  // open the edit dialog for Customers or Shops and refresh the data afterwards
  onEdit(element: any): void {
    if (this.label === 'Customers') {
      this.router.navigate([
        '/candy-shop/details-management/customer-details',
        element.id,
      ]);
    } else if (this.label === 'Shops') {
      const dialogRef = this.dialog.open(ShopModalComponent, { data: element });
      dialogRef?.afterClosed().subscribe((updatedData) => {
        if (updatedData) {
          // update dataSource with the new changes
          const index = this.dataSource.data.findIndex(
            (item) => item.id === updatedData.id,
          );
          if (index !== -1) {
            this.dataSource.data[index] = updatedData;
          }
          this.dataSource.data = [...this.dataSource.data]; // trigger change detection by reassigning
        }
      });
    }
  }

  onDelete(element: any): void {
    this.dataService.deleteCustomer(element.id);
  }

  addCustomer(): void {
    this.dialog.open(CustomerModalComponent);
  }
}
