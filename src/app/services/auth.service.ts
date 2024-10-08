import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILoginCredentials } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; //JSON server URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<ILoginCredentials> {
    // Fetch users from the server
    return this.http.get<ILoginCredentials[]>(`${this.baseUrl}/customers`).pipe(
      map((users) => {
        // Find the user with the matching username and password
        const user = users.find(
          (u) => u.email === email && u.password === password,
        );
        return user ? user : null;
      }),
    );
  }
}
