// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button
} from 'react-native';
import getHeaderTextFromProfile from 'app/lib/getHeaderTextFromProfile';
import { type PetProfile } from 'app/types';
import PetProfileComponent from 'app/components/atm.PetProfile';
import { getSavedProfilesState } from 'app/selectors/savedProfiles';

const PetProfileCard = ({ petProfile }: { petProfile: PetProfile }) => (
  <View
    style={{
      flexDirection: 'row',
      width: '100%',
      borderColor: 'black',
      borderWidth: 1,
      padding: 5,
      minHeight: 90
    }}
  >
    <Image style={{ width: 80, height: 80 }} source={{ uri: petProfile.img }} />
    <View style={{ flex: 4, paddingHorizontal: 20 }}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10
        }}
      >
        {getHeaderTextFromProfile(petProfile)}
      </Text>
      <Text
        style={{
          fontSize: 16
        }}
        numberOfLines={2}
      >
        {petProfile.profile}
      </Text>
    </View>
  </View>
);

type Props = {
  savedProfiles: PetProfile[]
};

type State = {
  modal: null | {
    isVisible: boolean,
    petProfile: PetProfile
  }
};

class Saved extends React.Component<Props, State> {
  state = {
    modal: null
  };

  closeModal = () => {
    this.setState(state => ({
      modal: {
        ...state.modal,
        isVisible: false
      }
    }));
  };

  showModal = (petProfile: PetProfile) =>
    this.setState({
      modal: {
        petProfile,
        isVisible: true
      }
    });

  renderProfileModal = () => {
    const { modal } = this.state;
    if (modal) {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modal.isVisible}
          onRequestClose={this.closeModal}
        >
          <PetProfileComponent
            petProfile={modal.petProfile}
            bottomChildren={
              <View
                style={{ flex: 0, width: '100%', minHeight: 40, height: 40 }}
              >
                <Button title="Close" onPress={this.closeModal} />
              </View>
            }
          />
        </Modal>
      );
    }
    return null;
  };

  render() {
    const { savedProfiles } = this.props;
    const petProfileCards = savedProfiles.map(petProfile => (
      <TouchableOpacity
        key={petProfile.id}
        // eslint-disable-next-line react/jsx-no-bind
        onPress={() => this.showModal(petProfile)}
      >
        <View style={{ marginBottom: 10 }}>
          <PetProfileCard petProfile={petProfile} />
        </View>
      </TouchableOpacity>
    ));
    return (
      <View style={[StyleSheet.absoluteFill]}>
        {this.renderProfileModal()}
        <ScrollView
          style={{ height: '100%' }}
          contentContainerStyle={{ padding: 10 }}
        >
          {petProfileCards}
        </ScrollView>
      </View>
    );
  }
}

const mapState = (state): $Shape<Props> => ({
  savedProfiles: getSavedProfilesState(state)
});

export default connect(mapState)(Saved);
