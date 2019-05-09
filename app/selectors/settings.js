// @flow

import { type State } from 'app/redux-store';
import { createSelector } from 'reselect';

export const getSettingsState = (state: State) => state.settings;

export const getSettings = createSelector(
  getSettingsState,
  settingsState => settingsState.settings
);
