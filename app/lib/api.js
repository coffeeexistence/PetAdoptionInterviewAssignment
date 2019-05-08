// @flow
import { type PetProfile, type Settings } from "app/types";

const apiGet = async (uri: string) => {
  const response = await fetch(uri);
  if (!response.ok || response.status !== 200) {
    throw new Error(`request failure: ${uri}`);
  }
  return response.json();
};

export const fetchAllProfiles = (): Promise<PetProfile[]> =>
  apiGet("https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pets.json");

export const fetchSettings = (): Promise<Settings> =>
  apiGet("https://s3-us-west-2.amazonaws.com/cozi-interview-dev/settings.json");
