/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import AppStartup from "app/components/ctr.AppStartup";
import Navigation from "app/components/ctr.Navigation";

export default () => (
  <View style={StyleSheet.absoluteFill}>
    <StatusBar hidden />
    <AppStartup />
    <Navigation />
  </View>
);
