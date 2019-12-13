import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import Home from './pages/Home';
import Login from './pages/Login';
import News from './pages/News';
import Header from './components/Header';
import Footer from './components/Footer';

interface AppProps {
  isLogin?: boolean,
  useStyles?: any
}


class App extends Component<AppProps> {

  render() {
    let headerElement : any = null;
    let element : any = null;
    if (this.props.isLogin) {
      headerElement = <Route path="/" render={() => <Header />} />;
      element = <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/news" render={() => <News />} />
      </Switch>;
    } else {
      element = <Switch><Route path="/" render={() => <Login />} /></Switch>;
    }
    const classes = this.props.useStyles;
    let test: any = <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start"  color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </div>;
    
    return (
      <div>
        {test}
        <Helmet>
          <title>App</title>
        </Helmet>
          {headerElement}
          {element}
        <Footer />
      </div>
    );
  }
}

export default App;