_Although I would ususally opt for having all of this information in JIRA, it isn't neccesary for a solo project, so this document will do_

# Installation instructions (macOS only)

_Disclaimer, I haven't tested these steps on any machine besides my own, there could very well be steps that I am missing_

- Ensure that homebrew is installed.
- Install and set up NVM through homebrew if it isn't already present.
- You'll want to be on node version `v10.15.3`, you can get on that version by running `nvm install 10.15.3`, `nvm alias default 10.15.3`, and then `nvm use default`.
- Install global dependencies, `npm i -g yarn@1.15.2 react-native-cli@2.0.1`.
- Run `yarn` at the root of this repo.
- Run `react-native run-android`, if you see errors about accpeting build-tools/platform-tools licenses, you'll need to install the versions of build-tools and platform-tools mentioned in the error text, you can follow [these instructions](https://developer.android.com/studio/intro/update#sdk-manager) for more instructions.
- Run `react-native run-ios` for iOS.

# Dev notes

- I would use redux-thunk/redux-saga for sufficiently complex requirements, but in this case I will use react renderless components to handle async data flows.

## Atomic Component Naming
The file naming structure loosely follows the atomic folder structure, in this repo you'll only see two kinds of these: 
- `atomic` components, which begin with `atm`. These are single-purpose presentational components which have no knowledge of redux.
- `container` components, which begin with `ctr`. These components can be responsible for business logic, be aware of redux, Navigation, etc. They may not even render any UI.

# Out of scope (but wouldn't be for an actual project)

- Tablet support
- Notch support (Android or iOS)
- Other iPhone X/XS/XR spacing issues
- Offline UI
- Local persistence between sessions
- Testing of animations on low-end devices
- Selector tests (due to time limitations)

# State

## Type Definitions

```js
type PetProfile = {
  id: number,
  type: string,
  name: string,
  img: string, // image uri
  sex: string,
  age: number,
  profile: string
};

type Settings = {
  id: number,
  profile: string,
  typePreference: 'cat' | 'dog',
  ageRange: {
    min: number,
    max: number
  }
};
```

# API

API requests are made from:

```
app/lib/api
```

### Pets

Url: https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pets.json
API response:

```js
{
  body: PetProfile[]
}
```

### Settings

Url: https://s3-us-west-2.amazonaws.com/cozi-interview-dev/settings.json
API response:

```js
{
  body: Settings;
}
```

## Redux Store

Top-level view:

```js
{
    savedProfiles: PetProfile[],
    allProfiles: {
        profiles: ?PetProfile[],
        isLoading: ?boolean,
        didEncounterFetchError: ?boolean,
    },
    settings: {
        settings: ?Settings,
        isLoading: ?boolean,
        didEncounterFetchError: ?boolean,
    }
}
```

### savedProfiles

- [x] Reducer: ADD_SAVED_PROFILE should add the profile to the beginning of the state (unshift)

### allProfiles

- [x] Reducer: GET_ALL_PROFILES should set profiles to correct value, isLoading flag to true, and set didEncounterFetchError to null

- [x] Reducer: GET_ALL_PROFILES_SUCCESS should set isLoading flag to false

- [x] Reducer: GET_ALL_PROFILES_FAILURE should should set isLoading flag to false and set didEncounterFetchError to true

### settings

- [x] Reducer: GET_SETTINGS should set settings to correct value, set isLoading flag to true, and set didEncounterFetchError to null

- [x] Reducer: GET_SETTINGS_SUCCESS should set isLoading flag to false

- [x] Reducer: GET_SETTINGS_FAILURE should should set isLoading flag to false and set didEncounterFetchError to true

- [x] Reducer: SET_SETTINGS should set settings

# High level architecture overview

- Additional Dependencies
  - redux / react-redux
  - react-navigation
- Framework-agnostic helpers (app/lib)
  - API call wrappers (app/lib/api)
    - fetchSettings
    - fetchAllProfiles
- Redux store (app/redux-store) Using ducks pattern (domain-based file structure/exports)
  - settings
  - allProfiles
  - savedProfiles
  - index (reducers are combined and state type is defined)
- Redux Selectors (app/selectors):
  - settings
  - allProfiles
  - savedProfiles
  - getFilteredPetProfiles (filters allProfiles based on settings)
- Components (app/components)
  - StoreProvider
    - initializes and provides redux store from app/state)
  - AppStartupContainer (startup-related business logic)
    - Settings and Pets API requests
  - Tabs
    - Search
    - Saved
    - (Can trigger top-level overlays using RN's Modal component)
    - Settings
- Types (app/types) - general type defintiions

## AppStartupContainer

AppStartupContainer is a renderless component that will be mounted on app startup, and will be responsible for the following business logic:

- Fetching and persisting pets.json api response to redux, and handling error cases
- Fetching and persisting settings.json api response to redux, and handling error cases

As I'd like to keep this implementation as simple as possible, I will be making use of renderless components for async business logic rather than redux-saga/redux-thunk. (mentioned in dev notes as well)

## Tabs

Utilizes react-navigation to provide a simple tab interface for the required views.

## Tabs: Search

- As a User I can see a “Search” screen with a pet’s profile and picture on it.

- As a User I only see the pets that match my preferences (Set on the “Setting” screen)

- As a User I can swipe left to indicate that I am not interested in the pet and move on to
  the next pet.

- As a User I can swipe right to indicate that I am interested in the pet which will add it to
  my saved pets and move on to the next pet.

## Tabs: Saved

- As a User I can visit a “Saved” page so I can see a list of all the pets I swiped right on.

- As a User I can tap on a pet from the saved screen to see their full profile (This can be an overlay/modal that can be closed, or a new sub-screen that can be backed out of).

## Tabs: Settings

- As a User I can visit a “Settings” page where I can edit my Adopter Profile which contains information about myself for the adoption agency to view as well as my pet preference (Dog or Cat) and age preference.

# Manual Testing

### Manual tests have been gone through on:

- [x] Android
- [x] iOS Standard (previous gen): iPhone 6/6Plus/iPhone 8

### Test flows

- As a User I can see a “Search” screen with a pet’s profile and picture on it.

- As a User I only see the pets that match my preferences (Set on the “Setting” screen)

- As a User I can swipe left to indicate that I am not interested in the pet and move on to
  the next pet.

- As a User I can swipe right to indicate that I am interested in the pet which will add it to
  my saved pets and move on to the next pet.

- As a User I can visit a “Saved” page so I can see a list of all the pets I swiped right on.

- As a User I can tap on a pet from the saved screen to see their full profile (This can be an overlay/modal that can be closed, or a new sub-screen that can be backed out of).

- As a User I can visit a “Settings” page where I can edit my Adopter Profile which contains information about myself for the adoption agency to view as well as my pet preference (Dog or Cat) and age preference.

- Test to ensure that Android back button and iOS gestures behaves as expected.
