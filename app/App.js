// @flow

import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import AppStartup from './components/ctr.AppStartup';
import Navigation from './components/ctr.Navigation';
import StoreProvider from './components/ctr.StoreProvider';

export default () => (
  <View style={StyleSheet.absoluteFill}>
    <StoreProvider>
      <StatusBar hidden />
      <AppStartup />
      <Navigation />
    </StoreProvider>
  </View>
);
