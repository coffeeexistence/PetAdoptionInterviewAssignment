// @flow

import * as React from "react";
import {
  Animated,
  StyleSheet,
  View,
  Easing,
  Dimensions,
  Text,
  Image,
  ScrollView
} from "react-native";
import type { PetProfile } from "app/types";
import getHeaderTextFromProfile from "app/lib/getHeaderTextFromProfile";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    minHeight: "50%"
  },
  headerText: {
    fontSize: 20
  },
  bodyText: {
    fontSize: 16
  }
});

export default ({
  petProfile,
  bottomChildren
}: {
  petProfile: PetProfile,
  bottomChildren?: React.Node
}) => (
  <View style={[StyleSheet.absoluteFill, { height: "100%" }]}>
    <Image style={styles.image} source={{ uri: petProfile.img }} />
    <View style={{ marginHorizontal: 10, flex: 1 }}>
      <View style={{ marginVertical: 15 }}>
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
