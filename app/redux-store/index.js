// @flow
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import allProfilesReducer from "./allProfiles";

const rootReducer = combineReducers({ allProfiles: allProfilesReducer });
export default createStore(rootReducer, composeWithDevTools());
