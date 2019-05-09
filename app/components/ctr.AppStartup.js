// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import {
  getAllProfiles as getAllProfilesAction,
  getAllProfilesFailure as getAllProfilesFailureAction,
  getAllProfilesSuccess as getAllProfilesSuccessAction
} from 'app/redux-store/allProfiles';
import {
  getSettings as getSettingsAction,
  getSettingsFailure as getSettingsFailureAction,
  getSettingsSuccess as getSettingsSuccessAction
} from 'app/redux-store/settings';
import { fetchAllProfiles, fetchSettings } from 'app/lib/api';

type Props = {
  getAllProfiles: typeof getAllProfilesAction,
  getAllProfilesFailure: typeof getAllProfilesFailureAction,
  getAllProfilesSuccess: typeof getAllProfilesSuccessAction,
  getSettings: typeof getSettingsAction,
  getSettingsSuccess: typeof getSettingsSuccessAction,
  getSettingsFailure: typeof getSettingsFailureAction
};

class AppStartup extends React.PureComponent<Props> {
  componentDidMount() {
    this.fetchProfiles();
    this.fetchSettings();
  }

  fetchProfiles = () => {
    const {
      getAllProfiles,
      getAllProfilesSuccess,
      getAllProfilesFailure
    } = this.props;

    getAllProfiles();
    fetchAllProfiles()
      .then(getAllProfilesSuccess)
      .catch(getAllProfilesFailure);
  };

  fetchSettings = () => {
    const { getSettings, getSettingsSuccess, getSettingsFailure } = this.props;

    getSettings();
    fetchSettings()
      .then(getSettingsSuccess)
      .catch(getSettingsFailure);
  };

  render() {
    return null;
  }
}

const mapDispatch: $Shape<Props> = {
  getAllProfiles: getAllProfilesAction,
  getAllProfilesFailure: getAllProfilesFailureAction,
  getAllProfilesSuccess: getAllProfilesSuccessAction,
  getSettings: getSettingsAction,
  getSettingsSuccess: getSettingsSuccessAction,
  getSettingsFailure: getSettingsFailureAction
};

export default connect(
  null,
  mapDispatch
)(AppStartup);
