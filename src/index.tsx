import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import App from './App';

const rootElement = document.getElementById('root');
let value = true;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
console.log('test: ', useStyles);
ReactDOM.render(
  <BrowserRouter>
    <App isLogin={value} useStyles={useStyles}/>
  </BrowserRouter>,
  rootElement
);