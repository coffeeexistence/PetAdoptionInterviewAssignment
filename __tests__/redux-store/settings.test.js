// @flow

import reducer, {
  getSettings,
  getSettingsFailure,
  getSettingsSuccess,
  setSettings
} from '../../app/redux-store/settings';

const testSettings = {
  id: 1001,
  profile:
    'I love all animals! I live in a nice big house on an acre of land, the pets will have plenty of room to run around and have fun. I work from home too so I will always be available to them. I grew up on a farm and have a great deal of experience working with animals.',
  typePreference: 'cat',
  ageRange: {
    min: 0,
    max: 20
  }
};

describe('reducer', () => {
  it('GET_SETTINGS should set isLoading flag to true and set didEncounterFetchError to null', () => {
    const initialState = {
      settings: null,
      isLoading: null,
      didEncounterFetchError: false
    };
    const action = getSettings();
    expect(reducer(initialState, action)).toEqual({
      settings: null,
      isLoading: true,
      didEncounterFetchError: null
    });
  });

  it('GET_SETTINGS should set settings to correct value, set isLoading flag to true, and set didEncounterFetchError to null', () => {
    const initialState = {
      settings: null,
      isLoading: true,
      didEncounterFetchError: null
    };
    const action = getSettingsSuccess(testSettings);
    expect(reducer(initialState, action)).toEqual({
      settings: testSettings,
      isLoading: false,
      didEncounterFetchError: false
    });
  });

  it('GET_SETTINGS_FAILURE should should set isLoading flag to false and set didEncounterFetchError to true', () => {
    const initialState = {
      settings: null,
      isLoading: true,
      didEncounterFetchError: null
    };
    const action = getSettingsFailure();
    expect(reducer(initialState, action)).toEqual({
      settings: null,
      isLoading: false,
      didEncounterFetchError: true
    });
  });

  it('SET_SETTINGS should set settings', () => {
    const newSettings = {
      ...testSettings,
      profile: 'testing124'
    };
    const initialState = {
      settings: testSettings,
      isLoading: false,
      didEncounterFetchError: false
    };
    const action = setSettings(newSettings);
    expect(reducer(initialState, action)).toEqual({
      settings: newSettings,
      isLoading: false,
      didEncounterFetchError: false
    });
  });
});
