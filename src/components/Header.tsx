import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import loadable from '@loadable/component';
const IconMenu = loadable(() => import(/* webpackChunkName: "Window" */ './IconMenu'));

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        loginTitle : {
          textAlign: "center",
          flexGrow: 1,
        },
        title: {
          flexGrow: 1,
        },
    });

export interface AppbarProps extends WithStyles<typeof styles> {
  isLogin?: boolean,
  isLoginPage?: boolean,
  title?: string
}

function titleDiv(title?: string){
    return <div>
    {title}
  </div>
}

class Appbar extends Component<AppbarProps> {

  

  render() {
    const {classes, title, isLogin, isLoginPage} = this.props;
    let content: any = null;
    if (!isLoginPage) {
      content = <div className={classes.root}>
      <AppBar position="static">
        <Toolbar  >
          <IconButton edge="start"  color="inherit" aria-label="menu">
          <IconMenu title={title} />
            
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {titleDiv(title)}
          </Typography>
            <Button color="inherit" href="login">Login</Button>
        </Toolbar>
      </AppBar>
    </div>;
    } else {
      content = <div className={classes.root}>
      <AppBar position="static" style={{ background: '#03a9f4'}} >
        <Toolbar>
          <IconButton edge="start"  color="default" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.loginTitle}>
            {titleDiv(title)}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default withStyles(styles)(Appbar);