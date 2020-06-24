import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAuthActions from './auth.actions';
import { exhaustMap, map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.loginUser),
      exhaustMap((action) =>
        this.authService.login(action.userLogin).pipe(
          map((user) => this.authService.mapUserToAuth(user)),
          map((user) => {
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
