// @flow
import * as React from "react";
import { View, Text } from "react-native";
import getHeaderTextFromProfile from "app/lib/getHeaderTextFromProfile";
import { type PetProfile } from "app/types";
import { pets } from "app/lib/sampleData";

// TODO: Rename
const PetProfileCard = ({ petProfile }: { petProfile: PetProfile }) => (
  <Text
    style={{
      fontSize: 20
    }}
  >
    {getHeaderTextFromProfile(petProfile)}
  </Text>
);

class Saved extends React.Component<void> {
  render() {
    const petProfileCards = pets.map(petProfile => (
      <PetProfileCard key={petProfile.id} petProfile={petProfile} />
    ));
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {petProfileCards}
      </View>
    );
  }
}

export default Saved;
