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

export default ({ petProfile }: { petProfile: PetProfile }) => (
  <View style={[StyleSheet.absoluteFill]}>
    <Image style={styles.image} source={{ uri: petProfile.img }} />
    <View style={{ marginHorizontal: 10, height: "100%" }}>
      <View style={{ marginVertical: 15 }}>
        <Text style={styles.headerText}>
          {getHeaderTextFromProfile(petProfile)}
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.bodyText}>{petProfile.profile}</Text>
      </ScrollView>
    </View>
  </View>
);
