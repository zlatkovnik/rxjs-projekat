import { Action, createReducer, on } from '@ngrx/store';
import { loginUser, registerUser, logoutUser } from './user.actions';
import { state } from '@angular/animations';

export const userFeatureKey = 'user';

export interface UserState {
  username: string;
}

export const initialState: UserState = {
  //Kad je username prazan string znaci da korisnik nije logovan
  username: '',
};

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state, { username }) => ({ ...state, username: username })),
  on(logoutUser, (state) => ({ ...state, username: '' }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
