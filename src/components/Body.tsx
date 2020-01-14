import React, { Component } from 'react';
import loadable from '@loadable/component';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
const Home = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/Home'));
const Login = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/Login'));
const News = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/News'));
const SignUp = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/SignUp'));
const SearchPassword = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/SearchPassword'));
const SearchId = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/SearchId'));

export interface BodyProps {
pageName:string
}


class Body extends Component<BodyProps>{


  render() {
    const {pageName} = this.props;
    let content: any = null;
    if (pageName === "Home") {
      content = (<Home />)
    } else if (pageName === "Login") {
      content = (<Login />)
    } else if (pageName === "News") {
      content = (<News />)
    } else if (pageName === "SignUp") {
      content = (<SignUp />)
    } else if (pageName === "SearchPassword") {
      content = (<SearchPassword />)
    } else if (pageName === "SearchId") {
      content = (<SearchId />)
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Body;