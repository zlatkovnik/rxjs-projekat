import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import User from '../models/user.model';
import { mapUserToProfile } from './util';
import Profile from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/users';

  getUser(userId: number): Observable<Profile> {
    return this.http
      .get<User>(`${this.baseUrl}/${userId}`)
      .pipe(map((user) => mapUserToProfile(user)));
  }

  getUserProfileImageUrl(username: string) {
    return this.http.get<User[]>(this.baseUrl + '?username=' + username).pipe(
      tap((users) => {
        if (users.length === 0) throw 'User not found';
      }),
      map((users) => users[0].profileImage)
    );
  }
}
