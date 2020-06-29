import { createAction, props } from '@ngrx/store';

import Auth from '../models/auth.model';
import UserRegister from '../models/user-register.model';
import UserLogin from '../models/user-login.model';

export const setUser = createAction(
  '[Auth Init Service] Init Auth User',
  props<{ auth: Auth }>()
);

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

export const logoutUser = createAction('[Auth Service] Logout User');

export const logoutUserSuccess = createAction(
  '[Auth Effect] Logout User Success'
);

export const logoutUserFailure = createAction(
  '[Auth Effect] Logout User Failure'
);

export const updateProfileImage = createAction(
  '[Auth Component] Update Profile Image',
  props<{ userId: number; url: string }>()
);

export const updateProfileImageSuccess = createAction(
  '[Auth Effect] Update Profile Image Success',
  props<{ auth: Auth }>()
);

export const updateProfileImageFailure = createAction(
  '[Auth Effect] Update Profile Image Failure',
  props<{ error: any }>()
);

export const cleanupAuth = createAction('[Auth Component] Cleanup Auth');
