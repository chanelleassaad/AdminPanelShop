import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; //JSON server URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // Fetch users from the server
    return this.http.get<any[]>(`${this.baseUrl}/customers`).pipe(
      map((users) => {
        // Find the user with the matching username and password
        const user = users.find(
          (u) => u.username === username && u.password === password,
        );
        return user ? user : null;
      }),
    );
  }
}
