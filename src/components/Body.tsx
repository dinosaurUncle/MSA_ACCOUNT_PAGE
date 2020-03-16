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
const SignUp = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/SignUp'));
const SearchPassword = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/SearchPassword'));
const SearchId = loadable(() => import(/* webpackChunkName: "Window" */ '../pages/SearchId'));

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
}


class Body extends Component<BodyGridProps>{


  render() {
    const {classes, pageName} = this.props;
    console.log('pageName: ', pageName);
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
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
          <IconMenu title={"asdf"} />
          </Grid>
          <Grid item xs={8}>
            {content}    
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(StyledMenuItem)(Body);