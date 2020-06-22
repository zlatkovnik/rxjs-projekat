import { createAction, props } from '@ngrx/store';

export const LOGIN_USER = '[User] Login User';
export const SUCCESSFUL_LOGIN_USER = '[User] Successful Login User';
export const ERROR_LOGIN_USER = '[User] Error Login User';

export const REGISTER_USER = '[User] Register User';
export const SUCCESSFUL_REGISTER_USER = '[User] Successful Register User';
export const ERROR_REGISTER_USER = '[User] Error Register User';

export const LOGOUT_USER = '[User] Logout User';

export const loginUser = createAction(
  LOGIN_USER,
  props<{ username: string; password: string }>()
);

export const successfulLoginUser = createAction(
  SUCCESSFUL_LOGIN_USER,
  props<{ username: string }>()
);

export const errorLoginUser = createAction(
  ERROR_LOGIN_USER,
  props<{ error: string }>()
);

export const registerUser = createAction(
  REGISTER_USER,
  props<{ username: string; password: string }>()
);

export const successfulRegisterUser = createAction(
  SUCCESSFUL_REGISTER_USER,
  props<{ username: string }>()
);

export const errorRegisterUser = createAction(
  ERROR_REGISTER_USER,
  props<{ error: string }>()
);

export const logoutUser = createAction(LOGOUT_USER);
