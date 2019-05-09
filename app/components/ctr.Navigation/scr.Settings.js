// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';
import { type Settings } from 'app/types';
import { setSettings as setSettingsAction } from 'app/redux-store/settings';
import { getSettings } from 'app/selectors/settings';
import { type State } from 'app/redux-store';

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    width: '100%',
    padding: 10
  },
  bodyText: {
    fontSize: 16
  },
  headerText: {
    fontSize: 18
  },
  largeHeaderText: {
    fontSize: 24
  },
  profileTextInput: {
    minHeight: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    fontSize: 16
  },
  ageTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    padding: 5,
    marginLeft: 15,
    minWidth: 60
  },
  settingsListRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15
  },
  sectionHeader: {
    marginTop: 15,
    marginBottom: 5
  },
  typePreferenceSwitch: {
    marginHorizontal: 5
  }
});

type SectionHeaderProps = { title: string };
const SectionHeader = ({ title }: SectionHeaderProps) => (
  <Text style={[styles.largeHeaderText, styles.sectionHeader]}>{title}</Text>
);

type SettingsListRowProps = {
  title: string,
  rightSlot: React.Node
};
const SettingsListRow = ({ title, rightSlot }: SettingsListRowProps) => (
  <View style={[styles.settingsListRowContainer]}>
    <Text style={styles.headerText}>{title}</Text>
    {rightSlot}
  </View>
);

type Props = {
  settings: ?Settings,
  setSettings: typeof setSettingsAction
};

class SettingsScreen extends React.PureComponent<Props> {
  updateSettings = updates => {
    const { settings, setSettings } = this.props;
    if (!settings) return;
    setSettings({
      ...settings,
      ...updates
    });
  };

  updateProfileText = text => this.updateSettings({ profile: text });

  updateTypePreference = isDog =>
    this.updateSettings({ typePreference: isDog ? 'dog' : 'cat' });

  onAgeRangeMinTextUpdated = min => {
    const { settings } = this.props;
    if (!settings) return;
    this.updateSettings({
      ageRange: {
        ...settings.ageRange,
        min: min.length > 0 ? parseInt(min, 10) : 0
      }
    });
  };

  onAgeRangeMaxTextUpdated = max => {
    const { settings } = this.props;
    if (!settings) return;
    this.updateSettings({
      ageRange: {
        ...settings.ageRange,
        max: max.length > 0 ? parseInt(max, 10) : 0
      }
    });
  };

  render() {
    const { settings } = this.props;
    if (!settings) return null;

    const { profile, typePreference, ageRange } = settings;
    return (
      <View style={styles.settingsContainer}>
        <SectionHeader title="Adopter Profile" />
        <TextInput
          multiline
          style={[styles.profileTextInput, styles.bodyText]}
          // eslint-disable-next-line react/jsx-no-bind
          onChangeText={this.updateProfileText}
          value={profile}
        />
        <SectionHeader title="Preferences" />
        <SettingsListRow
          title="Animal"
          rightSlot={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.headerText}>Cat</Text>
              <Switch
                style={styles.typePreferenceSwitch}
                value={typePreference === 'dog'}
                onValueChange={this.updateTypePreference}
              />
              <Text style={styles.headerText}>Dog</Text>
            </View>
          }
        />

        <SettingsListRow
          title="Age"
          rightSlot={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.ageTextInput, styles.bodyText]}
                placeholder="min"
                placeholderTextColor="grey"
                onChangeText={this.onAgeRangeMinTextUpdated}
                value={ageRange.min.toString()}
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.ageTextInput, styles.bodyText]}
                placeholder="max"
                placeholderTextColor="grey"
                onChangeText={this.onAgeRangeMaxTextUpdated}
                value={ageRange.max.toString()}
                keyboardType="number-pad"
              />
            </View>
          }
        />
      </View>
    );
  }
}

const mapState = (state: State): $Shape<Props> => ({
  settings: getSettings(state)
});

const mapDispatch: $Shape<Props> = {
  setSettings: setSettingsAction
};

export default connect(
  mapState,
  mapDispatch
)(SettingsScreen);
