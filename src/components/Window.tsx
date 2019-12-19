
import Header  from './Header'
import Body from '../components/Body'
import Footer from './Footer';
import Helmet from 'react-helmet';
import React, { Component } from 'react';


export interface WindowProps {
  pageTitle?:string
  pageName:string
}

export interface WindowStates {}


class Window extends Component<WindowProps>{

  

  render() {
     const {pageTitle, pageName} = this.props; 
     let title:string = "App";
     if (pageName !== "Home") {
       title = "" + pageTitle;
     }
     let isLoginPage:boolean = false;
     if (pageName === "Login") isLoginPage = true;

    return (
      <div> 
        <Helmet>
          <title>{title}</title>
        </Helmet>
          <Header title={pageTitle} isLoginPage={isLoginPage} /> 
          <Body pageName={pageName}/>
          <Footer />
      </div>
    );
  }
}

export default Window;