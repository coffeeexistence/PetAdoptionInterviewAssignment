_Although I would ususally opt for having all of this information in JIRA, it isn't neccesary for a solo project, so this document will do_

# Dev notes
- Persistence of fetched/modified redux data is not required
- I would use redux-thunk/redux-saga for sufficiently complex requirements, but in this case I will use react renderless components to handle async data flows.

Top Level TODO:
- Create project structure
- Create testing structure to match
- Create App tab container
- Create basic Search view with dummy data
- app/state
    - Add tests for search actions, reducers, and selectors
    - Get tests passing
    - Do anything else needed to get search state to a component (full data piping)
        - StoreProdiver
    

# State

## Type Definitions

```js

type PetProfile = {
    "id": number,
    "type": string,
    "name": string,
    "img": string, // image uri
    "sex": string,
    "age": number,
    "profile": string
}

type Settings = {
    "id": number,
    "profile": string,
    "typePreference": "cat" | "dog",
    "ageRange": {
        "min": number,
        "max": number
    }
}

```

# API

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
    body: Settings
}
```

## Redux Store
Top-level view:
```js
{
    // Redux persisted
    // ASK TODO: Saving all PetProfile data rather than just the IDs since it is not clear whether allProfiles will always contain the IDs that savedProfiles referenes
    savedProfiles: PetProfile[], 
    candidateProfiles: {
        profiles: PetProfile[],
        isLoading: boolean,
        didEncounterFetchError: boolean,
    },
    settings: {
        settings: Settings,
        isLoading: boolean,
        didEncounterFetchError: boolean,
    }
    navigation: // TODO: Unknown
}
```

### savedProfiles

- [ ] Reducer: ADD_SAVED_PROFILE should add the profile to the beginning of the state (unshift)
- [ ] Action: addSavedProfile should return the correct shape

### allProfiles

- [ ] Reducer: GET_ALL_PROFILES should set isLoading flag to true and set didEncounterFetchError to null
- [ ] Action: getAllProfiles should return the correct shape

- [ ] Reducer: GET_ALL_PROFILES_SUCCESS should set isLoading flag to false
- [ ] Action: getAllProfilesSuccess should return the correct shape

- [ ] Reducer: GET_ALL_PROFILES_FAILURE should should set isLoading flag to false and set didEncounterFetchError to true
- [ ] Action: getAllProfilesFailure should return the correct shape

### settings

- [ ] Reducer: GET_SETTINGS should set isLoading flag to true and set didEncounterFetchError to null
- [ ] Action: getSettings should return the correct shape

- [ ] Reducer: GET_SETTINGS_SUCCESS should set isLoading flag to false
- [ ] Action: getSettingsSuccess should return the correct shape

- [ ] Reducer: GET_SETTINGS_FAILURE should should set isLoading flag to false and set didEncounterFetchError to true
- [ ] Action: getSettingsFailure should return the correct shape

### candidateProfiles

# High level architecture overview

- Additional Dependencies
    - redux / react-redux
    - react-navigation
- Framework-agnostic helpers (app/lib)
    - API call wrappers
        - fetchSettings
        - fetchAllProfiles
- Redux store (app/state)
    - settings
        - actions/reducers
    - allProfiles
        - actions/reducers
    - savedProfiles
        - actions/reducers
    - index (reducers are combined and state type is defined)
- Redux Selectors (app/state/{domain}/selectors):
    - settings
    - allProfiles
    - savedProfiles
- Components (app/components)
    - App
        - StoreProvider
            - initializes and provides redux store from app/state)
        - AppStartupContainer (startup-related business logic)
            - Settings and Pets API requests
        - Tabs
            - Search
            - Saved
                - (Can trigger top-level overlays using RN's Modal component)
            - Settings
- Types (app/types)
    - Top level flow type defintiions for the project

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

- As a User I can tap on a pet from the saved screen to see their full profile (This can be  an overlay/modal that can be closed, or a new sub-screen that can be backed out of).

## Tabs: Settings
- As a User I can visit a “Settings” page where I can edit my Adopter Profile which contains information about myself for the adoption agency to view as well as my pet preference (Dog or Cat) and age preference.


# Manual Testing

### All manual tests have been gone through on:
- [ ] Android
- [ ] Android tablet (bonus)
- [ ] Android (notched)
- [ ] iOS Small: iPhone 5s/SE
- [ ] iOS Standard (last gen): iPhone 6/6Plus/iPhone 8
- [ ] iOS next-gen (notched): iPhone X, iPhone XR, iPhone XS
- [ ] Airplane mode

### Test flows
- As a User I can see a “Search” screen with a pet’s profile and picture on it.

- As a User I only see the pets that match my preferences (Set on the “Setting” screen)

- As a User I can swipe left to indicate that I am not interested in the pet and move on to 
the next pet.

- As a User I can swipe right to indicate that I am interested in the pet which will add it to 
my saved pets and move on to the next pet.

- As a User I can visit a “Saved” page so I can see a list of all the pets I swiped right on.

- As a User I can tap on a pet from the saved screen to see their full profile (This can be  an overlay/modal that can be closed, or a new sub-screen that can be backed out of).

- As a User I can visit a “Settings” page where I can edit my Adopter Profile which contains information about myself for the adoption agency to view as well as my pet preference (Dog or Cat) and age preference.

- Test to ensure that Android back button and iOS gestures behaves as expected.

# Must do before turning in

- [ ] All manual tests have been gone through on
- [ ] All documentation TODOs are finished
- [ ] Ensure code for fetching https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pets.json is documented (see spec pdf for more info)
- [ ] Ensure code for fetching https://s3-us-west-2.amazonaws.com/cozi-interview-dev/settings.json is documented (see spec pdf for more info)