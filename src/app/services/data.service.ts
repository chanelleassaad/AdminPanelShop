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

  updateCustomer(updatedCustomer: any): void {
    const customers = this.customersSubject.getValue();
    const index = customers.findIndex(
      (customer) => customer.id === updatedCustomer.id,
    );

    customers[index] = { ...customers[index], ...updatedCustomer };
    this.customersSubject.next(customers);
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
    const currentCustomers = this.customersSubject.getValue();

    // Generate a new id by finding the max id and incrementing it
    const newId =
      currentCustomers.length > 0
        ? Math.max(...currentCustomers.map((customer) => customer.id)) + 1
        : 1; // If no customers, start with id 1

    const customerWithId = { ...newCustomer, id: newId }; // Add the new id to the customer

    const updatedCustomers = [...currentCustomers, customerWithId]; // Append the new customer with id
    this.customersSubject.next(updatedCustomers); // Update the subject

    // Save the customer with id to the backend if I had one
    // this.http.post(`${this.baseUrl}/customers`, customerWithId).subscribe();
  }

  updateShops(shops: any[]): void {
    this.shopsSubject.next(shops);
  }

  updateProducts(products: any[]): void {
    this.productsSubject.next(products);
  }
}
