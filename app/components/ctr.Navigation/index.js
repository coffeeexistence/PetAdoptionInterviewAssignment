// @flow

import * as React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Search from "./scr.Search";
import Saved from "./scr.Saved";
import Settings from "./scr.Settings";

const TabNavigator = createBottomTabNavigator({
  Saved: Saved,
  Search: Search,
  Settings: Settings
});

export default createAppContainer(TabNavigator);
