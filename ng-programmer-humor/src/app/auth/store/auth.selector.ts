import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

export const selectUserState = createFeatureSelector<AuthState>(authFeatureKey);

export const authUser = createSelector(
  selectUserState,
  (state: AuthState) => state.user
);

export const authLoading = createSelector(
  selectUserState,
  (state: AuthState) => state.loading
);

export const authError = createSelector(
  selectUserState,
  (state: AuthState) => state.error
);

export const authMessage = createSelector(
  selectUserState,
  (state: AuthState) => state.message
);
