// @flow
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import allProfilesReducer from "./allProfiles";
import savedProfilesReducer from "./savedProfiles";
import settingsReducer from "./settings";

const rootReducer = combineReducers({
  settings: settingsReducer,
  allProfiles: allProfilesReducer,
  savedProfiles: savedProfilesReducer
});

export default createStore(rootReducer, composeWithDevTools());
