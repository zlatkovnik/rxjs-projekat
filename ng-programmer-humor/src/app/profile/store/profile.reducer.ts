import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import Profile from '../models/profile.model';
import * as ProfileActions from './profile.actions';

export const profilesFeatureKey = 'profiles';

export interface ProfileState {
  selectedProfile: Profile;
  loading: boolean;
  error: any;
}

export const initialState: ProfileState = {
  selectedProfile: undefined,
  loading: false,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(ProfileActions.loadProfile, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ProfileActions.loadProfileSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      error: undefined,
      selectedProfile: action.profile,
    };
  }),
  on(ProfileActions.loadProfileFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(ProfileActions.editProfile, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ProfileActions.editProfileSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      error: undefined,
      selectedProfile: action.profile,
    };
  }),
  on(ProfileActions.editProfileFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(ProfileActions.cleanUpProfile, (state) => ({
    ...state,
    loading: false,
    error: undefined,
  }))
);
