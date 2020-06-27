import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ProfileService } from '../service/profile.service';
import * as fromProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileActions.loadProfile),
      mergeMap((action) =>
        this.profileService.getUser(action.id).pipe(
          map((profile) =>
            fromProfileActions.loadProfileSuccess({ profile: profile })
          ),
          catchError((error) =>
            of(
              fromProfileActions.loadProfileFailure({
                error: 'Connection timed out',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}
