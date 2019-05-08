// @flow

import React, { Component } from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import AppStartup from "app/components/ctr.AppStartup";
import Navigation from "app/components/ctr.Navigation";
import StoreProvider from "./components/ctr.StoreProvider";

export default () => (
  <View style={StyleSheet.absoluteFill}>
    <StoreProvider>
      <StatusBar hidden />
      <AppStartup />
      <Navigation />
    </StoreProvider>
  </View>
);
