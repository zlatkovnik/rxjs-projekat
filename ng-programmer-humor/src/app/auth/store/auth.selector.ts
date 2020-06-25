import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

export const selectUserState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(
  selectUserState,
  (state: AuthState) => state.user
);

export const selectAuthLoading = createSelector(
  selectUserState,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectUserState,
  (state: AuthState) => state.error
);

export const selectAuthMessage = createSelector(
  selectUserState,
  (state: AuthState) => state.message
);
