// @flow
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import allProfilesReducer, {
  type State as AllProfilesState
} from "./allProfiles";
import savedProfilesReducer, {
  type State as SavedProfilesState
} from "./savedProfiles";
import settingsReducer, { type State as SettingsState } from "./settings";

export type State = {
  settings: SettingsState,
  allProfiles: AllProfilesState,
  savedProfiles: SavedProfilesState
};

const rootReducer = combineReducers({
  settings: settingsReducer,
  allProfiles: allProfilesReducer,
  savedProfiles: savedProfilesReducer
});

export default createStore(rootReducer, composeWithDevTools());
