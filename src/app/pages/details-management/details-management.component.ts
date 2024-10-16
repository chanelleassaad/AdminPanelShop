import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

import { ContentTableComponent } from '../../components/content-table/content-table.component';

@Component({
    selector: 'app-details-management',
    templateUrl: './details-management.component.html',
    standalone: true,
    imports: [
    MatTabGroup,
    MatTab,
    ContentTableComponent
],
})
export class DetailsManagementComponent implements OnInit {
  private route = inject(ActivatedRoute);

  labels = ['Customers', 'Shops', 'Orders'];
  label: string | null = 'Customers';
  selected = new FormControl(0);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.label = params.get('label');
      if (this.label)
        this.label = this.label?.charAt(0).toUpperCase() + this.label?.slice(1);
      const index = this.labels.indexOf(this.label || 'Customers');
      this.selected.setValue(index);
    });
  }
}
