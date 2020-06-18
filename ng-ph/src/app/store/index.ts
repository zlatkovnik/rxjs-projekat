import { createSelector } from '@ngrx/store';

import * as fromUser from './user/user.reducer';

export interface AppState {
  user: fromUser.UserState;
}

export const selectUser = (state: AppState) => state.user;

export const selectUsername = createSelector(
  selectUser,
  (state: fromUser.UserState) => state.username
);
