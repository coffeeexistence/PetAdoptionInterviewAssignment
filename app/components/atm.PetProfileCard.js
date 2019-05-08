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

const testColorTable = {
  "1001": "red",
  "1002": "blue",
  "1003": "purple",
  "1004": "green"
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    minHeight: "50%"
  }
});

export default ({ petProfile }: { petProfile: PetProfile }) => (
  <View style={[StyleSheet.absoluteFill]}>
    <Image style={styles.image} source={{ uri: petProfile.img }} />
    <View style={{ marginHorizontal: 10, height: "100%" }}>
      <View style={{ marginVertical: 15 }}>
        <Text>Fido, 3yr, M</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <Text>{petProfile.profile}</Text>
      </ScrollView>
    </View>
  </View>
);
