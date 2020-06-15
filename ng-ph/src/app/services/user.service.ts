import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import User from '../models/models.user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.get<User[]>(this.baseURL + '?username=' + username).pipe(
      tap((users) => {
        if (users.length === 0) throw 'User does not exist';
        else if (users[0].password !== password) throw 'Invalid password';
      })
    );
  }
}
