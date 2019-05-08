// @flow

// @flow
import type { Settings } from "app/types";

type GetSettingsAction = { type: "GET_SETTINGS" };

type GetSettingsFailureAction = { type: "GET_SETTINGS_FAILURE" };

type GetSettingsSuccessAction = {
  type: "GET_SETTINGS_SUCCESS",
  payload: { settings: Settings }
};

type SetSettingsAction = {
  type: "SET_SETTINGS",
  payload: { settings: Settings }
};

type Action =
  | GetSettingsAction
  | GetSettingsFailureAction
  | GetSettingsSuccessAction
  | SetSettingsAction;

export const getSettings = (): GetSettingsAction => ({
  type: "GET_SETTINGS"
});

export const getSettingsFailure = (): GetSettingsFailureAction => ({
  type: "GET_SETTINGS_FAILURE"
});

export const getSettingsSuccess = (
  settings: Settings
): GetSettingsSuccessAction => ({
  type: "GET_SETTINGS_SUCCESS",
  payload: { settings }
});

export const setSettings = (settings: Settings): SetSettingsAction => ({
  type: "SET_SETTINGS",
  payload: { settings }
});

type State = {
  settings: ?Settings,
  isLoading: ?boolean,
  didEncounterFetchError: ?boolean
};

const initialState: State = {
  settings: null,
  isLoading: null,
  didEncounterFetchError: null
};

export default (previousState: State = initialState, action: Action): State => {
  switch (action.type) {
    case "GET_SETTINGS":
      return {
        ...previousState,
        isLoading: true,
        didEncounterFetchError: null
      };
    case "GET_SETTINGS_FAILURE":
      return {
        ...previousState,
        isLoading: false,
        didEncounterFetchError: true
      };
    case "GET_SETTINGS_SUCCESS":
      return {
        ...previousState,
        settings: action.payload.settings,
        isLoading: false,
        didEncounterFetchError: false
      };
    case "SET_SETTINGS":
      return {
        ...previousState,
        settings: action.payload.settings
      };
    default:
      return previousState;
  }
};
