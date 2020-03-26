import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';

let session:any = null;
loadableReady(() => {
  const rootElement = document.getElementById('root');
  const sessionElement : HTMLElement | null = document.getElementById('session');
  if ( sessionElement) {
    const definitelySessionElement : HTMLElement = sessionElement;
    session = JSON.parse(definitelySessionElement.innerHTML);
    console.log('session: ', session);
  }
  const location = document.location;
  ReactDOM.render(
    <BrowserRouter>
      <App location={location} session={session} />
    </BrowserRouter>,
    rootElement
  );
});

if (module.hot) {
  module.hot.accept();
}