import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import MailIcon from '@material-ui/icons/Mail';
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import loadable from '@loadable/component';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Badge } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';


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
        sectionDesktop: {
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
        },
        sectionMobile: {
          display: 'flex',
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        },
    });
export interface State {
  anchorEl:any
  mobileMoreAnchorEl:any
}   

export interface AppbarProps extends WithStyles<typeof styles> {
  isLogin?: boolean,
  isLoginPage?: boolean,
  title?: string,
  session?: any
}

function titleDiv(title?: string){
    return <div>
    {title}
  </div>
}

class Appbar extends Component<AppbarProps> {

  state:State = {
    anchorEl:null,
    mobileMoreAnchorEl:null
  }

  render() {
    const logout = () => {
      let jsonData = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: null};
        fetch('/logout', jsonData)
        .then(res => {
          res.json().then(
            data => {
              window.location.replace("/login");
            }
          )
        })
        .then(json => console.log(json))
        .catch(err => console.log(err));
    };
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(this.state.anchorEl);
    

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const handleProfileMenuOpen = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event: any) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    const setAnchorEl = (target:EventTarget & HTMLButtonElement | null) => {
      this.setState({
        anchorEl: target
      })
    }

    const setMobileMoreAnchorEl = (target:EventTarget & HTMLButtonElement | null) => {
      this.setState({
        mobileMoreAnchorEl: target
      })
    }
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
    
    const {classes, title, isLogin, isLoginPage, session} = this.props;
    let content: any = null;
    if (!isLoginPage) {
      content = <div className={classes.root}>
      <AppBar position="static">
        <Toolbar  >
          <Typography variant="h6" className={classes.title}>
            {titleDiv(title)}
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
            <Button color="inherit" onClick={logout} >Log Out</Button>
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