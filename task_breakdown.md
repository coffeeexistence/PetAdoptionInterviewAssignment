_Although I would ususally opt for having all of this information in JIRA, it isn't neccesary for a solo project, so this document will do_

# Dev notes
- Persistence of fetched/modified redux data is not required
- I would use redux-thunk/redux-saga for sufficiently complex requirements, but in this case I will use react components to handle async data flows.
- I h

# State

## Type Definitions

```js

type PetProfile = {
    "id": number,
    "type": sting,
    "name": sting,
    "img": sting, // image uri
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

- Redux store
    - settings
    - allProfiles
    - savedProfiles
    - navigation
- Components
    - App
        - AppStartupContainer


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

# Must do before turning in

- [ ] All manual tests have been gone through on
- [ ] All documentation TODOs are finished
- [ ] Ensure code for fetching https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pets.json is documented (see spec pdf for more info)
- [ ] Ensure code for fetching https://s3-us-west-2.amazonaws.com/cozi-interview-dev/settings.json is documented (see spec pdf for more info)