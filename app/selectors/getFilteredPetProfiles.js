// @flow

import { createSelector } from 'reselect';
import { type Settings, type PetProfile } from 'app/types';
import { getAllProfiles } from './allProfiles';
import { getSettings } from './settings';

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
