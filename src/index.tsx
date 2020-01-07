import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';


let isLogin:string = 'false';
let result:boolean = false;
loadableReady(() => {
  const rootElement = document.getElementById('root');
  const sessionElement : HTMLElement | null = document.getElementById('session');
  if ( sessionElement) {
    const definitelySessionElement : HTMLElement = sessionElement;
    isLogin = definitelySessionElement.innerHTML;
  }
  if (isLogin === 'true') {
    result = true;
  } else {
    result = false;
  }
  const location = document.location;
  ReactDOM.render(
    <BrowserRouter>
      <App isLogin={result} location={location} />
    </BrowserRouter>,
    rootElement
  );
});

if (module.hot) {
  module.hot.accept();
}