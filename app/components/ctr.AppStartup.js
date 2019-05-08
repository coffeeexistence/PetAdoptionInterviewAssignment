// @flow
import * as React from "react";
import { connect } from "react-redux";
import {
  getAllProfiles as getAllProfilesAction,
  getAllProfilesFailure as getAllProfilesFailureAction,
  getAllProfilesSuccess as getAllProfilesSuccessAction
} from "app/redux-store/allProfiles";
import { fetchAllProfiles } from "app/lib/api";

type Props = {
  getAllProfiles: typeof getAllProfilesAction,
  getAllProfilesFailure: typeof getAllProfilesFailureAction,
  getAllProfilesSuccess: typeof getAllProfilesSuccessAction
};

class AppStartup extends React.PureComponent<Props> {
  componentDidMount() {
    this.fetchProfiles();
  }

  fetchProfiles = () => {
    this.props.getAllProfiles();
    fetchAllProfiles()
      .then(this.props.getAllProfilesSuccess)
      .catch(this.props.getAllProfilesFailure);
  };

  render() {
    return null;
  }
}

const mapDispatch: $Shape<Props> = {
  getAllProfiles: getAllProfilesAction,
  getAllProfilesFailure: getAllProfilesFailureAction,
  getAllProfilesSuccess: getAllProfilesSuccessAction
};

export default connect(
  null,
  mapDispatch
)(AppStartup);
