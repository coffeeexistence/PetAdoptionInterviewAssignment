// @flow

import { type State } from 'app/redux-store';
import { createSelector } from 'reselect';

export const getAllProfilesState = (state: State) => state.allProfiles;

export const getAllProfiles = createSelector(
  getAllProfilesState,
  allProfilesState => allProfilesState.profiles
);
