// @flow

import * as React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Animated, StyleSheet, View, Easing, Dimensions } from "react-native";
import { pets } from "app/lib/sampleData";
import type { PetProfile } from "app/types";
import DraggableSwiperBox from "app/components/atm.DraggableSwiperBox";
import PetProfileCard from "app/components/atm.PetProfileCard";

type State = {
  currentIndex: number
};

class Search extends React.PureComponent<void, State> {
  state = {
    currentIndex: 0
  };

  onCurrentPetSwipe = (_direction: "left" | "right", _profileId: number) => {
    this.setState((state: State) => ({
      currentIndex: state.currentIndex + 1
    }));
  };

  render() {
    let currentPet = null;
    let nextPet = null;

    const currentPetProfile = pets[this.state.currentIndex];
    if (currentPetProfile) {
      currentPet = (
        <DraggableSwiperBox
          style={StyleSheet.absoluteFill}
          key={currentPetProfile.id}
          onSwipeComplete={(direction: "left" | "right") =>
            this.onCurrentPetSwipe(direction, currentPetProfile.id)
          }
        >
          <PetProfileCard petProfile={currentPetProfile} />
        </DraggableSwiperBox>
      );
    }

    const nextPetProfile = pets[this.state.currentIndex + 1];
    if (nextPetProfile) {
      nextPet = (
        <DraggableSwiperBox
          style={StyleSheet.absoluteFill}
          key={nextPetProfile.id}
        >
          <PetProfileCard petProfile={nextPetProfile} />
        </DraggableSwiperBox>
      );
    }

    return (
      <View style={[StyleSheet.absoluteFill]}>{[nextPet, currentPet]}</View>
    );
  }
}

export default Search;
