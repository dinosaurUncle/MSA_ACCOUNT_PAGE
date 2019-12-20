import { hydrate } from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';

let value = true;

loadableReady(() => {
  const rootElement = document.getElementById('root');
  hydrate(
    <BrowserRouter>
      <App isLogin={value} />
    </BrowserRouter>,
    rootElement
  );
});

if (module.hot) {
  module.hot.accept();
}