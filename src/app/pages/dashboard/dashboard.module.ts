import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    CanvasJSAngularChartsModule,
    MatIconModule,
  ],
})
export class DashboardModule {}
