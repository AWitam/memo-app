import React from 'react';

import './common/styles/_shared.scss';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from './app/routes';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </Provider>
);
