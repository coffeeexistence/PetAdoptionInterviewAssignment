// @flow

import * as React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Search from "./scr.Search";
import Saved from "./scr.Saved";
import Settings from "./scr.Settings";

const TabNavigator = createBottomTabNavigator({
  Settings: Settings,
  Saved: Saved,
  Search: Search
});

export default createAppContainer(TabNavigator);
