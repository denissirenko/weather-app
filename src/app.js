import React from 'react';
import { Provider } from 'react-redux';
import { store } from './milestone-1/init/store';

import { Source } from './milestone-1/source';

export const App = () => {
  return (
    <Provider store = {store}>
      <Source />
    </Provider>
  )
};
