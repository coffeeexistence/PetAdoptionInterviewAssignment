// @flow

import reducer, {
  getAllProfiles,
  getAllProfilesSuccess,
  getAllProfilesFailure
} from '../../app/redux-store/allProfiles';

describe('reducer', () => {
  it('GET_ALL_PROFILES should set isLoading flag to true and set didEncounterFetchError to null', () => {
    const initialState = {
      isLoading: null,
      profiles: [],
      didEncounterFetchError: false
    };
    const action = getAllProfiles();
    expect(reducer(initialState, action)).toEqual({
      isLoading: true,
      profiles: [],
      didEncounterFetchError: null
    });
  });

  it('GET_ALL_PROFILES_SUCCESS should set profiles to correct values, isLoading flag to false and didEncounterFetchError to false', () => {
    const initialState = {
      isLoading: true,
      profiles: null,
      didEncounterFetchError: null
    };
    const action = getAllProfilesSuccess([]);
    expect(reducer(initialState, action)).toEqual({
      isLoading: false,
      profiles: [],
      didEncounterFetchError: false
    });
  });

  it('GET_ALL_PROFILES_FAILURE should should set isLoading flag to false and set didEncounterFetchError to true', () => {
    const initialState = {
      isLoading: true,
      profiles: null,
      didEncounterFetchError: null
    };
    const action = getAllProfilesFailure();
    expect(reducer(initialState, action)).toEqual({
      isLoading: false,
      profiles: null,
      didEncounterFetchError: true
    });
  });
});
