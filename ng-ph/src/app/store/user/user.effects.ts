import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { mergeMap, exhaustMap, map, catchError, tap } from 'rxjs/operators';

import { loginUser, successfulLoginUser, errorLoginUser } from './user.actions';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  loginUserEffect$ = this.actions$.pipe(
    ofType(loginUser),
    exhaustMap((action) =>
      this.userService.login(action.username, action.password).pipe(
        map((user) => {
          this.router.navigate(['/']);
          return successfulLoginUser({ username: user.username });
        }),
        catchError((error) => of(errorLoginUser({ error })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService
  ) {}
}
