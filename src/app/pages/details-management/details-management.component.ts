import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-details-management',
  templateUrl: './details-management.component.html',
})
export class DetailsManagementComponent implements OnInit {
  labels = ['Customers', 'Shops', 'Orders'];
  label: string | null = 'Customers';
  selected = new FormControl(0);

  constructor(private route: ActivatedRoute) {}

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
