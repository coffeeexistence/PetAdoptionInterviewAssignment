// @flow
import type { PetProfile } from "app/types";

type GetAllProfilesAction = { type: "GET_ALL_PROFILES" };

type GetAllProfilesFailureAction = { type: "GET_ALL_PROFILES_FAILURE" };

type GetAllProfilesSuccessAction = {
  type: "GET_ALL_PROFILES_SUCCESS",
  payload: { profiles: PetProfile[] }
};

type Action =
  | GetAllProfilesAction
  | GetAllProfilesFailureAction
  | GetAllProfilesSuccessAction;

export const getAllProfiles = (): GetAllProfilesAction => ({
  type: "GET_ALL_PROFILES"
});

export const getAllProfilesFailure = (): GetAllProfilesFailureAction => ({
  type: "GET_ALL_PROFILES_FAILURE"
});

export const getAllProfilesSuccess = (
  profiles: PetProfile[]
): GetAllProfilesSuccessAction => ({
  type: "GET_ALL_PROFILES_SUCCESS",
  payload: { profiles }
});

export type State = {
  profiles: ?(PetProfile[]),
  isLoading: ?boolean,
  didEncounterFetchError: ?boolean
};

const initialState: State = {
  profiles: null,
  isLoading: null,
  didEncounterFetchError: null
};

export default (previousState: State = initialState, action: Action): State => {
  switch (action.type) {
    case "GET_ALL_PROFILES":
      return {
        ...previousState,
        isLoading: true,
        didEncounterFetchError: null
      };
    case "GET_ALL_PROFILES_FAILURE":
      return {
        ...previousState,
        isLoading: false,
        didEncounterFetchError: true
      };
    case "GET_ALL_PROFILES_SUCCESS":
      return {
        ...previousState,
        profiles: action.payload.profiles,
        isLoading: false,
        didEncounterFetchError: false
      };
    default:
      return previousState;
  }
};
