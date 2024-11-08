import React, { useState } from 'react';
import Navigator from './Navigator';
import { store } from './store';
import { Provider } from 'react-redux';

export default function App() {
  return (
  <Provider store={store} >
    <Navigator  />
  </Provider>
  );
}


