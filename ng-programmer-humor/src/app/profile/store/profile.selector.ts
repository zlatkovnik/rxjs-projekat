import { createFeatureSelector, createSelector } from '@ngrx/store';
import { profilesFeatureKey, ProfileState } from './profile.reducer';

export const selectProfileState = createFeatureSelector<ProfileState>(
  profilesFeatureKey
);

export const selectedProfile = createSelector(
  selectProfileState,
  (state: ProfileState) => state.selectedProfile
);
export const selectedProfileError = createSelector(
  selectProfileState,
  (state: ProfileState) => state.error
);
export const selectedProfileLoading = createSelector(
  selectProfileState,
  (state: ProfileState) => state.loading
);
