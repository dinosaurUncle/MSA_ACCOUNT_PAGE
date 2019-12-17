
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Link } from 'react-router-dom';

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
    if (isLoginPage) {
      content = <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {titleDiv(title)}
          </Typography>
            <Button color="inherit">Login<Link to="/login"></Link></Button>
        </Toolbar>
      </AppBar>
    </div>;
    } else {
      content = <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {titleDiv(title)}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>;
    }
    
    
    return (
      <div>
        {content}
        <Helmet>
          <title>App</title>
        </Helmet>
      </div>
    );
  }
}

export default withStyles(styles)(Appbar);