// @flow

import type { PetProfile } from "app/types";

type AddSavedProfileAction = {
  type: "ADD_SAVED_PROFILE",
  payload: { profile: PetProfile }
};

type Action = AddSavedProfileAction;

export const addSavedProfile = (
  profile: PetProfile
): AddSavedProfileAction => ({
  type: "ADD_SAVED_PROFILE",
  payload: { profile }
});

type State = PetProfile[];

const initialState: State = [];

export default (previousState: State = initialState, action: Action): State => {
  switch (action.type) {
    case "ADD_SAVED_PROFILE":
      return [action.payload.profile, ...previousState];
    default:
      return previousState;
  }
};
