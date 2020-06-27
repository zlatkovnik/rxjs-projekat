import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAuthActions from './auth.actions';
import { exhaustMap, map, catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { mapUserToAuth } from '../service/util';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.loginUser),
      exhaustMap((action) =>
        this.authService.login(action.userLogin).pipe(
          map((user) => mapUserToAuth(user)),
          map((user) => {
            window.localStorage.setItem('AUTH', JSON.stringify(user));
            this.router.navigate(['/']);
            return fromAuthActions.loginUserSuccess({ user: user });
          }),
          catchError((error) =>
            of(fromAuthActions.loginUserFailure({ error: error }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.registerUser),
      exhaustMap((action) =>
        this.authService.register(action.userRegister).pipe(
          map(() => {
            this.router.navigate(['/login']);
            return fromAuthActions.registerUserSuccess();
          }),
          catchError((error) =>
            of(fromAuthActions.registerUserFailure({ error: error }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.logoutUser),
      exhaustMap((action) =>
        this.authService.logout().pipe(
          map((action) => {
            window.localStorage.removeItem('AUTH');
            this.authService.logout();
            return fromAuthActions.logoutUserSuccess();
          }),
          catchError((error) => of(fromAuthActions.logoutUserFailure()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
