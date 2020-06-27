import { createAction, props } from '@ngrx/store';
import Profile from '../models/profile.model';
import Auth from 'src/app/auth/models/auth.model';

export const loadProfile = createAction(
  '[Profile Component] Load Profile',
  props<{ id: number }>()
);

export const loadProfileSuccess = createAction(
  '[Profile Effect] Load Profile',
  props<{ profile: Profile }>()
);

export const loadProfileFailure = createAction(
  '[Profile Effect] Load Profile Failure',
  props<{ error: any }>()
);

export const editProfile = createAction('[Profile Component] Edit Profile');

export const editProfileSuccess = createAction(
  '[Profile Effect] Edit Profile Success',
  props<{ profile: Auth }>()
);
export const editProfileFailure = createAction(
  '[Profile Effect] Edit Profile Failure',
  props<{ error: any }>()
);
