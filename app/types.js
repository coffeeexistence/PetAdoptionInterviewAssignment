// @flow

export type PetProfile = {
  id: number,
  type: string,
  name: string,
  img: string, // image uri
  sex: string,
  age: number,
  profile: string
};

export type Settings = {
  id: number,
  profile: string,
  typePreference: "cat" | "dog",
  ageRange: {
    min: number,
    max: number
  }
};
