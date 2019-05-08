// @flow

import * as React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Search from "./scr.Search";

class SettingsScreen extends React.Component<void> {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Search: Search,
  Settings: SettingsScreen
});

export default createAppContainer(TabNavigator);
