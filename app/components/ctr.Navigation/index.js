// @flow

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Search from './scr.Search';
import Saved from './scr.Saved';
import Settings from './scr.Settings';

const TabNavigator = createBottomTabNavigator({
  Search,
  Saved,
  Settings
});

export default createAppContainer(TabNavigator);
