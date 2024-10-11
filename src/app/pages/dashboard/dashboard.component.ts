import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { map, tap } from 'rxjs/operators';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatIcon } from '@angular/material/icon';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [
        MatGridList,
        MatGridTile,
        CanvasJSAngularChartsModule,
        MatIcon,
        NgFor,
        NgIf,
        CurrencyPipe,
    ],
})
export class DashboardComponent implements OnInit {
  productChartOptions: any;
  orderChartOptions: any;
  revenueChartOptions: any;

  numberOfCustomers = 0;
  products: any[] = [];

  constructor(private dataService: DataService) {}

  isSmallScreen = false;
  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.onResize(null);
    this.loadData();
  }

  onResize(event: any) {
    this.isSmallScreen = window.innerWidth < 768;
  }

  loadData(): void {
    this.dataService.customers$.subscribe((customers) => {
      this.createCustomerChart(customers);
    });

    this.dataService.products$.subscribe((products) => {
      this.createProductChart(products);
      this.products = products;
    });

    this.dataService.customers$
      .pipe(
        map((customers) => customers.flatMap((customer) => customer.orders)), // combine all orders from all customers
        tap((orders) => this.createOrderChart(orders)), // update chart with combined orders
      )
      .subscribe();
  }

  createCustomerChart(customers: any[]): void {
    this.numberOfCustomers = customers.length;
  }

  createProductChart(products: any[]): void {
    const totalProducts = products.length;
    const unavailableProducts = products.filter((p) => !p.available).length;

    // to get the set dark purple
    const root = document.documentElement;
    const darkPurple = getComputedStyle(root)
      .getPropertyValue('--dark-purple')
      .trim();

    this.productChartOptions = {
      animationEnabled: true,
      title: {
        text: 'Products Overview',
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        fontColor: '#2d0a75',
      },
      data: [
        {
          type: 'pie',
          dataPoints: [
            {
              label: 'Total Products',
              y: totalProducts,
              color: darkPurple,
            },
            {
              label: 'Unavailable Products',
              y: unavailableProducts,
              color: 'mediumPurple',
            },
          ],
        },
      ],
    };
  }

  createOrderChart(orders: any[]): void {
    const root = document.documentElement;
    const darkPurple = getComputedStyle(root)
      .getPropertyValue('--dark-purple')
      .trim();

    // ORDERS CHART
    const ordersByDate: { [key: string]: number } = {};
    orders.forEach((order) => {
      const date = new Date(order.date).toLocaleDateString();

      // increment the count for each date or initialize it to 1
      if (ordersByDate[date]) {
        ordersByDate[date]++;
      } else {
        ordersByDate[date] = 1;
      }
    });
    const dataPoints = Object.keys(ordersByDate).map((date) => ({
      label: date,
      y: ordersByDate[date],
    }));
    this.orderChartOptions = {
      animationEnabled: true,

      title: {
        text: 'Orders Overview by Date',
        fontWeight: 'bold',
        fontSize: 17,
        fontFamily: 'Arial',
        fontColor: '#2d0a75',
      },
      axisX: {
        title: 'Date',
        valueFormatString: 'DD MMM',
        interval: 1,
        intervalType: 'day',
      },
      axisY: {
        title: 'Number of Orders',
        includeZero: true,
      },
      data: [
        {
          type: 'line',
          dataPoints: dataPoints,
          color: darkPurple,
        },
      ],
    };

    // REVENUE CHART
    const revenueByMonth: { [key: string]: number } = {};
    orders.forEach((order) => {
      const date = new Date(order.date);
      const month = date.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
      // initialize the month in the object if it doesn't exist
      if (!revenueByMonth[month]) {
        revenueByMonth[month] = 0;
      }
      // add the order total to the respective month's total revenue
      revenueByMonth[month] += order.total;
    });
    const dataPoints2 = Object.keys(revenueByMonth).map((month) => ({
      label: month,
      y: revenueByMonth[month],
    }));
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    this.revenueChartOptions = {
      animationEnabled: true,
      title: {
        text:
          'Monthly Revenue Overview (Total Revenue: ' +
          totalRevenue.toFixed(2) +
          ')',
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        fontColor: '#2d0a75',
      },
      axisY: {
        title: 'Revenue ($)',
        includeZero: true,
      },
      data: [
        {
          type: 'column',
          dataPoints: dataPoints2,
          color: darkPurple,
        },
      ],
    };
  }
}
