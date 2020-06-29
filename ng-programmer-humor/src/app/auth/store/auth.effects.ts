import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import * as fromAuthActions from './auth.actions';
import {
  exhaustMap,
  map,
  catchError,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { mapUserToAuth } from '../service/util';
import Auth from '../models/auth.model';

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
            location.reload();
            return fromAuthActions.logoutUserSuccess();
          }),
          catchError((error) => of(fromAuthActions.logoutUserFailure()))
        )
      )
    )
  );

  updateProfileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.updateProfileImage),
      exhaustMap((action) =>
        this.authService.updateProfileImage(action.userId, action.url).pipe(
          map((auth) => {
            window.localStorage.removeItem('AUTH');
            window.localStorage.setItem('AUTH', JSON.stringify(auth));
            const updatedUser: Auth = { ...auth, profileImage: action.url };
            return fromAuthActions.updateProfileImageSuccess({
              auth: updatedUser,
            });
          }),
          catchError((error) =>
            of(
              fromAuthActions.updateProfileImageFailure({
                error: 'Unable to update image',
              })
            )
          )
        )
      ),
      tap(() => this.router.navigate([`/`]))
    )
  );

  setKarma$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.setKarma),
        map((action) => {
          window.localStorage.removeItem('AUTH');
          window.localStorage.setItem('AUTH', JSON.stringify(action.user));
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
