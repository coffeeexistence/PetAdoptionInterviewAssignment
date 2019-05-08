// @flow
// fetchSettings

export const fetchAllProfiles = async () => {
  const response = await fetch(
    "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pets.json"
  );
  if (!response.ok || response.status !== 200) {
    throw new Error("fetchAllProfiles request failure");
  }
  const responseBody = await response.json();
  console.log(responseBody);
  return responseBody;
};
