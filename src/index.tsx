import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import App from './App';

const rootElement = document.getElementById('root');
let value = true;

ReactDOM.render(
  <BrowserRouter>
    <App isLogin={value} />
  </BrowserRouter>,
  rootElement
);