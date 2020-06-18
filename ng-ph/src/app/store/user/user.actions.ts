import { createAction, props } from '@ngrx/store';

export const loginUser = createAction(
  '[User] Login User',
  props<{ username: string }>()
);

export const registerUser = createAction(
  '[User] Register User',
  props<{ username: string }>()
);

export const logoutUser = createAction('[User] Logout User');
