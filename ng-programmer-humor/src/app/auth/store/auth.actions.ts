import { createAction, props } from '@ngrx/store';

import Auth from '../models/auth.model';
import UserRegister from '../models/user-register.model';
import UserLogin from '../models/user-login.model';

export const loginUser = createAction(
  '[Auth Service] Login User',
  props<{ userLogin: UserLogin }>()
);

export const loginUserSuccess = createAction(
  '[Auth Effect] Login User Success',
  props<{ user: Auth }>()
);

export const loginUserFailure = createAction(
  '[Auth Effect] Login User Failure',
  props<{ error: any }>()
);

export const registerUser = createAction(
  '[Auth Service] Register User',
  props<{ userRegister: UserRegister }>()
);

export const registerUserSuccess = createAction(
  '[Auth Effect] Register User Success'
);

export const registerUserFailure = createAction(
  '[Auth Effect] Register User Failure',
  props<{ error: any }>()
);
