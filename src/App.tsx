import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import Home from './pages/Home';
import Login from './pages/Login';
import News from './pages/News';
import Header from './components/Header';
import Footer from './components/Footer';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
    });

export interface AppProps extends WithStyles<typeof styles> {
  isLogin?: boolean
}


class App extends Component<AppProps> {

  render() {
    const {classes} = this.props;
    let menu : any = null;
    let element : any = null;
    let pathValue : String = 'null';
    menu = <Route path="/" render={() => <Header />} />;
      element = <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/news" render={() => <News />} />
      <Route path="/login" render={() => <Login />} />
      </Switch>;
    return (
      <div>
        
        <Helmet>
          <title>App</title>
        </Helmet>
          {element}
          {menu}
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(App);