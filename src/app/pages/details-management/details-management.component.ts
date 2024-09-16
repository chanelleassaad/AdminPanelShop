import { Component } from '@angular/core';

@Component({
  selector: 'app-details-management',
  templateUrl: './details-management.component.html',
  styleUrl: './details-management.component.css',
})
export class DetailsManagementComponent {
  labels = ['Customers', 'Shops', 'Orders'];
}
