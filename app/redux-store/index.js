// @flow
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import allProfilesReducer from "./allProfiles";
import savedProfilesReducer from "./savedProfiles";
import settingsReducer from "./settings";

const rootReducer = combineReducers({
  settings: settingsReducer,
  allProfiles: allProfilesReducer,
  savedProfiles: savedProfilesReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["savedProfiles"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default createStore(persistedReducer, composeWithDevTools());
