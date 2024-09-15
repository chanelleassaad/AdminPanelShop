import { Component, inject, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';

@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  styleUrls: ['./content-table.component.css'],
})
export class ContentTableComponent implements OnInit {
  @Input() label = ''; // 'Customers', 'Shops', 'Orders'

  dataSource: any[] = [];
  displayedColumns: string[] = [];
  displayedColumnsWithActions: string[] = [];

  data$: Observable<any[]> = of([]);

  readonly dialog = inject(MatDialog);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // fetch data based on which tab is selected
    switch (this.label) {
      case 'Customers':
        this.data$ = this.dataService.customers$;
        this.data$.subscribe((data) => {
          this.dataSource = data;
          this.setDisplayedColumns();
        });
        break;

      case 'Shops':
        this.data$ = this.dataService.shops$;
        this.data$.subscribe((data) => {
          this.dataSource = data;
          this.setDisplayedColumns();
        });
        break;

      case 'Orders':
        this.data$ = this.dataService.customers$.pipe(
          map((customers) => customers.flatMap((customer) => customer.orders)),
        );
        this.data$.subscribe((orders) => {
          this.dataSource = orders;
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
    if (this.dataSource.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource[0]);
      this.displayedColumnsWithActions = [...this.displayedColumns, 'actions'];
    }
  }

  onEdit(element: any): void {
    console.log(element);
  }

  onDelete(element: any): void {
    this.dataService.deleteCustomer(element.id);
  }

  addCustomer(): void {
    console.log('Add Customer');
    this.dialog.open(CustomerModalComponent);
  }
}
