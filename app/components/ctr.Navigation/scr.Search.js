// @flow

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import type { PetProfile } from 'app/types';
import DraggableSwiperBox from 'app/components/atm.DraggableSwiperBox';
import PetProfileComponent from 'app/components/atm.PetProfile';
import getFilteredPetProfiles from 'app/selectors/getFilteredPetProfiles';
import { addSavedProfile as addSavedProfileAction } from 'app/redux-store/savedProfiles';

const styles = StyleSheet.create({
  swiperBox: {
    ...StyleSheet.absoluteFillObject,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    backgroundColor: 'white',
    overflow: 'visible'
  }
});

type Props = {
  filteredPetProfiles: null | PetProfile[],
  addSavedProfile: typeof addSavedProfileAction
};

type State = {
  excludedIds: { [string]: boolean }
};

class Search extends React.PureComponent<Props, State> {
  state = {
    excludedIds: {}
  };

  onCurrentPetSwipe = (direction: 'left' | 'right') => {
    const { addSavedProfile } = this.props;
    const pets = this.getPets();
    if (!pets) return;
    const currentPetProfile = pets[0];
    this.setState(state => ({
      excludedIds: {
        ...state.excludedIds,
        [currentPetProfile.id]: true
      }
    }));
    if (direction === 'right') addSavedProfile(currentPetProfile);
  };

  getPets = () => {
    const { filteredPetProfiles } = this.props;
    const { excludedIds } = this.state;
    if (filteredPetProfiles) {
      return filteredPetProfiles.filter(
        profile => !excludedIds[profile.id.toString()]
      );
    }
    return null;
  };

  render() {
    const pets = this.getPets();
    if (!pets) return null;
    let currentPet = null;
    let nextPet = null;

    const currentPetProfile = pets[0];
    if (currentPetProfile) {
      currentPet = (
        <DraggableSwiperBox
          style={styles.swiperBox}
          key={currentPetProfile.id}
          onSwipeComplete={this.onCurrentPetSwipe}
        >
          <PetProfileComponent petProfile={currentPetProfile} />
        </DraggableSwiperBox>
      );
    }

    const nextPetProfile = pets[1];
    if (nextPetProfile) {
      nextPet = (
        <DraggableSwiperBox style={[styles.swiperBox]} key={nextPetProfile.id}>
          <PetProfileComponent petProfile={nextPetProfile} />
        </DraggableSwiperBox>
      );
    }

    return (
      <View style={StyleSheet.absoluteFill}>
        {nextPet}
        {currentPet}
      </View>
    );
  }
}

const mapDispatch: $Shape<Props> = {
  addSavedProfile: addSavedProfileAction
};

const mapState = (state): $Shape<Props> => ({
  filteredPetProfiles: getFilteredPetProfiles(state)
});

export default connect(
  mapState,
  mapDispatch
)(Search);
