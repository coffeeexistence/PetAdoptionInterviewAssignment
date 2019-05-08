// @flow
import * as React from "react";
import { Provider } from "react-redux";
import reduxStore from "app/redux-store";

export default (props: { children: React.Node }) => (
  <Provider store={reduxStore}>{props.children}</Provider>
);
