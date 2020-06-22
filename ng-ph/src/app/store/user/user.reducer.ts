import { Action, createReducer, on } from '@ngrx/store';
import {
  loginUser,
  registerUser,
  logoutUser,
  successfulLoginUser,
  errorLoginUser,
  successfulRegisterUser,
  errorRegisterUser,
} from './user.actions';

export interface UserState {
  username: string;
  error: string;
  loading: boolean;
}

export const initialState: UserState = {
  //Kad je username prazan string znaci da korisnik nije logovan
  username: '',
  error: '',
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({ ...state, loading: true })),
  on(successfulLoginUser, (state, { username }) => ({
    ...state,
    loading: false,
    username: username,
    error: '',
  })),
  on(errorLoginUser, (state, { error }) => ({
    ...state,
    error: error,
    username: '',
    loading: false,
  })),
  on(registerUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(successfulRegisterUser, (state, { username }) => ({
    ...state,
    username: username,
    loading: false,
    error: '',
  })),
  on(errorRegisterUser, (state, { error }) => ({
    ...state,
    username: '',
    loading: false,
    error: error,
  })),
  on(logoutUser, (state) => ({
    ...state,
    username: '',
    loading: false,
    error: '',
  }))
);
