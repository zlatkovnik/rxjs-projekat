import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AuthActions from './auth.actions';
import Auth from '../models/auth.model';

export const authFeatureKey = 'auth';

export interface AuthState extends EntityState<Auth> {
  error: any;
  user: Auth;
  loading: boolean;
  message: string;
}

export const adapter: EntityAdapter<Auth> = createEntityAdapter<Auth>();

export const initialState: AuthState = adapter.getInitialState({
  error: undefined,
  user: undefined,
  loading: false,
  message: undefined,
});

export const reducer = createReducer(
  initialState,
  on(AuthActions.setUser, (state, action) => {
    return { ...state, user: action.auth };
  }),
  on(AuthActions.loginUser, (state, action) => {
    return { ...state, loading: true };
  }),
  on(AuthActions.loginUserSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      user: action.user,
      error: undefined,
      message: undefined,
    };
  }),
  on(AuthActions.loginUserFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
      message: undefined,
    };
  }),
  on(AuthActions.registerUser, (state, action) => {
    return { ...state, loading: true };
  }),
  on(AuthActions.registerUserSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      error: undefined,
      message: 'Successfully registered',
    };
  }),
  on(AuthActions.registerUserFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
      message: undefined,
    };
  }),
  on(AuthActions.logoutUser, (state, action) => {
    return {
      ...state,
      user: undefined,
    };
  })
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
