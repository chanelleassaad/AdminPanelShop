import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:3000';

  // rxjs storage for instant updates
  private customersSubject = new BehaviorSubject<any[]>([]);
  private shopsSubject = new BehaviorSubject<any[]>([]);
  private productsSubject = new BehaviorSubject<any[]>([]);

  customers$ = this.customersSubject.asObservable();
  shops$ = this.shopsSubject.asObservable();
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  // fetch data from json
  private loadInitialData(): void {
    this.http
      .get<any[]>(`${this.baseUrl}/customers`)
      .subscribe((data) => this.customersSubject.next(data));
    this.http
      .get<any[]>(`${this.baseUrl}/shops`)
      .subscribe((data) => this.shopsSubject.next(data));
    this.http
      .get<any[]>(`${this.baseUrl}/products`)
      .subscribe((data) => this.productsSubject.next(data));
  }

  updateCustomers(customers: any[]): void {
    this.customersSubject.next(customers);
  }

  deleteCustomer(customerId: number): void {
    this.customers$
      .pipe(
        map((customers) =>
          customers.filter((customer) => customer.id !== customerId),
        ),
      )
      .subscribe((updatedCustomers) => this.updateCustomers(updatedCustomers));
  }

  addCustomer(newCustomer: any): void {
    this.customers$
      .pipe(map((customers) => [...customers, newCustomer]))
      .subscribe((updatedCustomers) => this.updateCustomers(updatedCustomers));
  }

  updateShops(shops: any[]): void {
    this.shopsSubject.next(shops);
  }

  updateProducts(products: any[]): void {
    this.productsSubject.next(products);
  }
}
