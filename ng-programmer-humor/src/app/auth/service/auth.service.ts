import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import UserLogin from 'src/app/auth/models/user-login.model';
import User from 'src/app/users/models/user.model';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import UserRegister from 'src/app/auth/models/user-register.model';
import Auth from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  //Očigledno ne bi trebalo da se pamte šifre u bazi
  //Takođe ne bi trebalo klijentska strana da proverava ove stvari
  //A naročito da vraća šifru korisniku
  //Zbog ograničenja json-servera sam morao ovako

  login(userLogin: UserLogin) {
    return this.http
      .get<User[]>(this.baseURL + '?username=' + userLogin.username)
      .pipe(
        tap((users) => {
          if (users.length === 0) throw 'User does not exist';
          else if (users[0].password !== userLogin.password)
            throw 'Invalid password';
        }),
        map((users) => users[0]),
        catchError((error) => throwError(`Request timed out`))
      );
  }

  register(userRegister: UserRegister) {
    const user = {
      email: userRegister.email,
      username: userRegister.username,
      password: userRegister.password,
      karma: 0,
    };
    return this.http
      .get<User[]>(this.baseURL + '?username=' + userRegister.username)
      .pipe(
        tap((users) => {
          if (users.length !== 0) throw 'User already exists';
        }),
        switchMap((_) => this.http.post(this.baseURL, user)),
        catchError((error) => throwError(`Request timed out`))
      );
  }

  mapUserToAuth(user: User): Auth {
    const { id, email, username, profileImage, karma } = user;
    return { id, email, username, profileImage, karma };
  }
}
