import { createSelector } from '@ngrx/store';
import { AppState } from '..';

const selectUser = (state: AppState) => state.userState;

export const selectUsername = createSelector(
  selectUser,
  (state) => state.username
);

export const selectError = createSelector(selectUser, (state) => state.error);

export const selectLoading = createSelector(
  selectUser,
  (state) => state.loading
);
