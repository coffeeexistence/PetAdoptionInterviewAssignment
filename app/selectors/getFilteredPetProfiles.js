// @flow

import { type State } from "app/redux-store";
import { createSelector } from "reselect";
import { getAllProfiles } from "./allProfiles";
import { getSettings } from "./settings";
import { type Settings, type PetProfile } from "app/types";

export default createSelector(
  [getAllProfiles, getSettings],
  (allProfiles: PetProfile[], settings: Settings): null | PetProfile[] => {
    if (settings && allProfiles) {
      return allProfiles.filter((profile: PetProfile) => {
        const { min, max } = settings.ageRange;
        const isWithinAgeRange = profile.age >= min && profile.age <= max;
        const isCorrectType = settings.typePreference === profile.type;
        return isWithinAgeRange && isCorrectType;
      });
    }
    return null;
  }
);
