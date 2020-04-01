import Helmet from 'react-helmet';
import React, { Component } from 'react';
import loadable from '@loadable/component';
const Header = loadable(() => import(/* webpackChunkName: "Window" */ './Header'));
const Body = loadable(() => import(/* webpackChunkName: "Window" */ './Body'));
const Footer = loadable(() => import(/* webpackChunkName: "Window" */ './Footer'));

export interface WindowProps {
  pageTitle?:string
  pageName:string
  session?: any
}

export interface WindowStates {}


class Window extends Component<WindowProps>{

  

  render() {
     const {pageTitle, pageName, session} = this.props; 
     let title:string = "App";
     if (pageName !== "Home") {
       title = "" + pageTitle;
     }
     let isLoginPage:boolean = false;
     if (pageName === "Login" || pageName === "SignUp"
        || pageName === "SearchPassword" || pageName === "SearchId") isLoginPage = true;

    return (
      <div> 
        <Helmet>
          <title>{title}</title>
        </Helmet>
          <Header title={pageTitle} isLoginPage={isLoginPage} session={session} /> 
            <Body pageName={pageName} isLoginPage={isLoginPage} session={session} />
          <Footer />
      </div>
    );
  }
}

export default Window;