import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../models/user.model';
import { switchMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/users';

  getUserProfileImageUrl(username: string) {
    return this.http.get<User[]>(this.baseUrl + '?username=' + username).pipe(
      tap((users) => {
        if (users.length === 0) throw 'User not found';
      }),
      map((users) => users[0].profileImage)
    );
  }
}
