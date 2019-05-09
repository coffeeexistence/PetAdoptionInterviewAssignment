// @flow

import * as React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import type { PetProfile } from 'app/types';
import getHeaderTextFromProfile from 'app/lib/getHeaderTextFromProfile';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    minHeight: '50%'
  },
  headerText: {
    fontSize: 20
  },
  bodyText: {
    fontSize: 16
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%'
  },
  detailsContainer: { marginHorizontal: 10, flex: 1 },
  headerContainer: { marginVertical: 15 }
});

const PetProfileComponent = ({
  petProfile,
  bottomChildren
}: {
  petProfile: PetProfile,
  bottomChildren?: React.Node
}) => (
  <View style={styles.container}>
    <Image style={styles.image} source={{ uri: petProfile.img }} />
    <View style={styles.detailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {getHeaderTextFromProfile(petProfile)}
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.bodyText}>{petProfile.profile}</Text>
      </ScrollView>
      {bottomChildren}
    </View>
  </View>
);

PetProfileComponent.defaultProps = {
  bottomChildren: undefined
};

export default PetProfileComponent;
