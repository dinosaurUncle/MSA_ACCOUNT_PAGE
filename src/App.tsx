import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import loadable from '@loadable/component';
const Window = loadable(() => import(/* webpackChunkName: "Window" */ './components/Window'));


export interface AppProps {
  location?: any
  session?: any
}

class App extends Component<AppProps> {

  render() {
    const {location, session} = this.props;
    let element : any = null;
    if (location != null){
      let pathName =  window.document.location.pathname;
      if (!session.login && pathName !== "/login" ) {
        if (pathName === "/searchpassword" ){
          element = <Switch>
            <Route path="/searchpassword" render={() => <Window pageName="SearchPassword" pageTitle="SearchPassword" />} />
        </Switch>;
        } else if (pathName === "/searchid") {
          element = <Switch>
          <Route path="/searchid" render={() => <Window pageName="SearchId" pageTitle="SearchId" />} />
        </Switch>;
        } else if (pathName === "/signup") {
          element = <Switch>
          <Route path="/signup" render={() => <Window pageName="SignUp" pageTitle="SignUp" />} />
        </Switch>;
        } else {
          window.location.replace("/login"); 
        }
      } else if (pathName === "/login" && session.login) {
        window.location.replace("/"); 
      } else if (!session.login && pathName === "/login" ) {
        element = <Switch>
        <Route path="/login" render={() => <Window pageName="Login" pageTitle="Login" />} />
        </Switch>;
      } else {
        element = <Switch>
        <Route exact path="/" render={() => <Window pageName="Home" pageTitle="Home" session={session} />} />
        <Route path="/news" render={() => <Window pageName="News" pageTitle="News" session={session} />} />
      </Switch>;
      } 
    }
    
      
    return (
      <div>
          {element}
      </div>
    );
  }
}

export default App;