import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import loadable from '@loadable/component';
const Window = loadable(() => import(/* webpackChunkName: "Window" */ './components/Window'));


export interface AppProps {
  isLogin?: boolean
  location?: any
}

class App extends Component<AppProps> {

  render() {
    const {isLogin, location} = this.props;
    
    let element : any = null;
    if (location != null){
      let pathName =  window.document.location.pathname;
      console.log("pathName: ", pathName);
      console.log("isLogin: ", isLogin);
      if (!isLogin && pathName !== "/login" ) {
        if (pathName === "/searchpassword" ){
          element = <Switch>
        <Route path="/searchpassword" render={() => <Window pageName="SearchPassword" pageTitle="SearchPassword" />} />
        </Switch>;
        } else if (pathName === "/signup") {
          element = <Switch>
        <Route path="/signup" render={() => <Window pageName="SignUp" pageTitle="SignUp" />} />
        </Switch>;
        } else {
          window.location.replace("/login"); 
        }
      } else if (pathName === "/login" && isLogin) {
        window.location.replace("/"); 
      } else if (!isLogin && pathName === "/login" ) {
        element = <Switch>
        <Route path="/login" render={() => <Window pageName="Login" pageTitle="Login" />} />
        </Switch>;
      } else {
        console.log('test1144444');
        element = <Switch>
      <Route exact path="/" render={() => <Window pageName="Home" pageTitle="Home" />} />
      <Route path="/news" render={() => <Window pageName="News" pageTitle="News" />} />
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