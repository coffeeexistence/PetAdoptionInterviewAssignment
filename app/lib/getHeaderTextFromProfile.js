// @flow
import { type PetProfile } from "app/types";

export default (petProfile: PetProfile) =>
  `${petProfile.name}, ${petProfile.age}yr, ${petProfile.sex}`;
