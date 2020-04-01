import React, { Component } from 'react';
import loadable from '@loadable/component';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const IconMenu = loadable(() => import(/* webpackChunkName: "Window" */ './IconMenu'));
const Home = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/Home'));
const Login = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/Login'));
const News = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/News'));
const Admin = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/Admin'));
const SignUp = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/SignUp'));
const SearchPassword = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/SearchPassword'));
const SearchId = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/SearchId'));
const MyAccount = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/MyAccount'));

const StyledMenuItem = (theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    });
export interface BodyGridProps extends WithStyles<typeof StyledMenuItem> {
  pageName:string
  isLoginPage:boolean
  session?: any
}


class Body extends Component<BodyGridProps>{


  pageSelector(pageName: string, session: any){
    console.log('pageName: ', pageName);
    let content: any = null;
    switch (pageName) {
      case "Home":
        content = (<Home />)
        break;
      case "Login":
        content = (<Login />)
        break;
      case "News":
        content = (<News />)
        break; 
      case "SignUp":
        content = (<SignUp />)
        break;  
      case "SearchPassword":
        content = (<SearchPassword />)
        break;
      case "SearchId":
        content = (<SearchId />)
        break;
      case "Admin":    
        content = (<Admin session={session} />)
        break;
      case "My Account":    
        content = (<MyAccount session={session} />)
        break;  
    }
    return content;
  }

  render() {
    const {classes, pageName, isLoginPage, session} = this.props;

    let content: any = this.pageSelector(pageName, session);
    const bodyContent = (isLoginPage)?
     <div >{content}</div> :
     <div className={classes.root}>
        <Grid container>
          
          <IconMenu title={"asdf"} session={session} />
          {content}    
        </Grid>
      </div>
    return (
      bodyContent
    );
  }
}

export default withStyles(StyledMenuItem)(Body);