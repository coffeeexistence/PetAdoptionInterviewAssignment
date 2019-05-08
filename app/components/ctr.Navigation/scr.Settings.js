// @flow

import * as React from "react";
import { connect } from "react-redux";
import { View, Text, TextInput, Switch, StyleSheet } from "react-native";
import { settings as sampleSettings } from "app/lib/sampleData";
import { type Settings } from "app/types";
import { setSettings as setSettingsAction } from "app/redux-store/settings";
import { getSettings } from "app/selectors/settings";
import { type State } from "app/redux-store";

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    width: "100%",
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
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    fontSize: 16
  },
  ageTextInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 7,
    padding: 5,
    marginHorizontal: 10,
    minWidth: 60
  },
  settingsListRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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

const SectionHeader = (props: { title: string }) => (
  <Text style={[styles.largeHeaderText, styles.sectionHeader]}>
    {props.title}
  </Text>
);

const SettingsListRow = (props: { title: string, rightSlot: React.Node }) => (
  <View style={[styles.settingsListRowContainer]}>
    <Text style={styles.headerText}>{props.title}</Text>
    {props.rightSlot}
  </View>
);

type Props = {
  settings: ?Settings,
  setSettings: typeof setSettingsAction
};

class SettingsScreen extends React.PureComponent<Props> {
  updateSettings = updates => {
    if (!this.props.settings) return;
    this.props.setSettings({
      ...this.props.settings,
      ...updates
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
          onChangeText={text => this.updateSettings({ profile: text })}
          value={profile}
        />
        <SectionHeader title="Preferences" />
        <SettingsListRow
          title="Animal"
          rightSlot={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.headerText}>Cat</Text>
              <Switch
                style={styles.typePreferenceSwitch}
                value={typePreference === "dog"}
                onValueChange={isDog =>
                  this.updateSettings({ typePreference: isDog ? "dog" : "cat" })
                }
              />
              <Text style={styles.headerText}>Dog</Text>
            </View>
          }
        />

        <SettingsListRow
          title="Age"
          rightSlot={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={[styles.ageTextInput, styles.bodyText]}
                placeholder="min"
                placeholderTextColor="grey"
                onChangeText={min => {
                  this.updateSettings({
                    ageRange: {
                      ...ageRange,
                      min: min.length > 0 ? parseInt(min) : 0
                    }
                  });
                }}
                value={ageRange.min.toString()}
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.ageTextInput, styles.bodyText]}
                placeholder="max"
                placeholderTextColor="grey"
                onChangeText={max => {
                  this.updateSettings({
                    ageRange: {
                      ...ageRange,
                      max: max.length > 0 ? parseInt(max) : 0
                    }
                  });
                }}
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
