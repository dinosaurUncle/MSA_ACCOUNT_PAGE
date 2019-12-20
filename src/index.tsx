import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';

let value = false;

loadableReady(() => {
  const rootElement = document.getElementById('root');
  const location = document.location;
  ReactDOM.render(
    <BrowserRouter>
      <App isLogin={value} location={location} />
    </BrowserRouter>,
    rootElement
  );
});

if (module.hot) {
  module.hot.accept();
}