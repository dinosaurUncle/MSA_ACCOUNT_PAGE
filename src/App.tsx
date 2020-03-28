import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import loadable from '@loadable/component';
const Window = loadable(() => import(/* webpackChunkName: "Window" */ './components/Window'));

export interface page {
  pageId : number
  pageName : string
  pageUrl : string
  description : string
}

export interface AppProps {
  location?: any
  session?: any
}

export interface AppState {
  pages : Array<page>
}

class App extends Component<AppProps> {
  state : AppState ={
    pages:this.props.session.pages
  }
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
          {this.state.pages.map(({pageId, pageName, pageUrl, description}) =>(
            <Route key={pageId} exact path={pageUrl} render={() => <Window pageName={pageName} pageTitle={pageName} session={session} />} />
          ))}
      </Switch>;
      } 
    }
    console.log("########");
    console.log(element);
      
    return (
      <div>
          {element}
      </div>
    );
  }
}

export default App;