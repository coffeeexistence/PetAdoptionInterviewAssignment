// @flow
import * as React from 'react';
import { Provider } from 'react-redux';
import reduxStore from 'app/redux-store';

type Props = { children: React.Node };
export default ({ children }: Props) => (
  <Provider store={reduxStore}>{children}</Provider>
);
