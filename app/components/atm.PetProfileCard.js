// @flow

import * as React from "react";
import { Animated, StyleSheet, View, Easing, Dimensions } from "react-native";
import type { PetProfile } from "app/types";

const testColorTable = {
  "1001": "red",
  "1002": "blue",
  "1003": "purple",
  "1004": "green"
};

export default ({ petProfile }: { petProfile: PetProfile }) => (
  <View
    style={[
      StyleSheet.absoluteFill,
      {
        backgroundColor: testColorTable[petProfile.id.toString()]
      }
    ]}
  />
);
