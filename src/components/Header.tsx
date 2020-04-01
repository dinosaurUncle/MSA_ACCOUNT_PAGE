import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Badge } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

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
        text: {
          padding: theme.spacing(2, 2, 0),
        },
        paper: {
          paddingBottom: 50,
          width: 300
        },
        list: {
          marginBottom: theme.spacing(1),
        },
        subheader: {
          backgroundColor: theme.palette.background.paper,
        },
        closeIcon: {
          
        },
        menuIcon: {
          marginRight:20
        }
    });
export interface State {
  count:number
  eventMessages:Array<EventMessage>
  anchorEl:any
  anchorEl2:any
  mobileMoreAnchorEl:any
}   

export interface EventMessage {
  eventMessageId: string
  accountId?: string
  eventMessageType?: string
  eventMessageTitle?: string
  eventMessageDescription?: string
  date?: string
  check?: boolean
}

export interface HeaderProps extends WithStyles<typeof styles> {
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

class Header extends Component<HeaderProps> {
  componentDidMount () {
    if (this.props.session){
      let jsonData = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }};
        fetch('/eventMessageList', jsonData)
        .then(res => {
          res.json().then(
            data => {
              let result = JSON.stringify(data);
              console.log(JSON.parse(result));
              let responseEventMessage = JSON.parse(result);
              this.setState({
                count : responseEventMessage.count,
                eventMessages : responseEventMessage.eventMessages
              })
            }
          )
        })
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }
  }

  state:State = {
    count: 0,
    eventMessages:[],
    anchorEl:null,
    anchorEl2:null,
    mobileMoreAnchorEl:null
  }

  render() {
    const {classes, title, isLogin, isLoginPage, session} = this.props;
    let date = new Date();
    let todayString = date.toISOString().substring(0,10);
    
    
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
    const goToMyAccount = () => {
      window.location.replace("/myaccount");
    }
    const menuId = 'primary-search-account-menu';
    const menu2Id = 'primary-search-account-menu';
    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMenu2Open = Boolean(this.state.anchorEl2);
    

    const mobileMenuId = 'primary-search-account-menu-mobile';
    
    const handleProfileMenuOpen = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event: any) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
    const eventMessageListOpen = (event: any) => {
      setAnchor2El(event.currentTarget);
    }
    const eventMessageListclose = () => {
      setAnchor2El(null);
    }
    
    
    const setAnchorEl = (target:EventTarget & HTMLButtonElement | null) => {
      this.setState({
        anchorEl: target
      })
    }

    const setAnchor2El = (target:EventTarget & HTMLButtonElement | null) => {
      this.setState({
        anchorEl2: target
      })
    }

    const setMobileMoreAnchorEl = (target:EventTarget & HTMLButtonElement | null) => {
      this.setState({
        mobileMoreAnchorEl: target
      })
    }
    const eventMessageCheck = (eventMessageId: string, accountId:string) =>{
      let convertJson : EventMessage = {
        eventMessageId : eventMessageId,
        accountId: accountId
      };
      let jsonData = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(convertJson)};
        console.log(jsonData);
        fetch('/eventMessageCheck', jsonData)
        .then(res => {
          res.json().then(
            data => {
              let result = JSON.stringify(data);
              console.log(JSON.parse(result));
              let responseEventMessage = JSON.parse(result);
              this.setState({
                eventMessages : responseEventMessage.eventMessages,
                count : responseEventMessage.count
              })
            }
          )
        })
        .then(json => console.log(json))
        .catch(err => console.log(err));
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
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
        <MenuItem onClick={goToMyAccount}>My Account</MenuItem>
        <MenuItem onClick={logout}>Log Out</MenuItem>
      </Menu>
    );
    let counter:number = 0;
    const eventMessageList = (
    <Menu
        anchorEl={this.state.anchorEl2}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menu2Id}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenu2Open}
        onClose={eventMessageListclose}
      >
        <Paper square className={classes.paper}>
        
          <Typography className={classes.text} variant="h5" gutterBottom>Event Message
            <IconButton aria-label="delete" color="primary" className={classes.closeIcon} onClick={eventMessageListclose}  >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>  
          </Typography>
          
              
          
          
          <List className={classes.list}>
            {this.state.eventMessages.map(({eventMessageId,  eventMessageType, eventMessageTitle, eventMessageDescription, date, check}) => (
              <React.Fragment key={eventMessageId}>
                {date != null  && <ListSubheader className={classes.subheader}>{date.substring(0,10) === todayString ? "Today" : date.substring(0,10)}</ListSubheader>}
                <ListItem button style={check?{background:"#e8eaf6"}: {}}>
                  {(eventMessageType === "account&amp;role"|| eventMessageType === "account&role" )&& <GroupIcon className={classes.menuIcon} />}
                  {(eventMessageType === "role&amp;page" || eventMessageType === "role&page") && <LibraryAddIcon className={classes.menuIcon} />}
                  {eventMessageType === "account" && <PersonIcon className={classes.menuIcon} />}
                  {eventMessageType === "page" && <LibraryBooksIcon className={classes.menuIcon} />}
                  {eventMessageType === "role" && <PermContactCalendarIcon className={classes.menuIcon} />}
                  <ListItemText  onClick={() => eventMessageCheck(eventMessageId, session.account.accountId)}  primary={eventMessageTitle} secondary={eventMessageDescription} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
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
        <MenuItem onClick={eventMessageListOpen}>
          <IconButton 
          aria-label="show 17 new notifications"
          color="inherit" 
          aria-controls={menu2Id}
          aria-haspopup="true"
          >
            <Badge badgeContent={this.state.count} color="secondary">
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
    
    
    let content: any = null;
    if (!isLoginPage) {
      content = <div className={classes.root}>
      <AppBar position="static">
        <Toolbar  >
          <Typography variant="h6" className={classes.title}>
            {titleDiv(title)}
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton 
              aria-label="show 17 new notifications"
              color="inherit" 
              onClick={eventMessageListOpen}
              edge="end"
              aria-controls={menu2Id}
              aria-haspopup="true"
              >
              <Badge badgeContent={this.state.count} color="secondary">
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
        {eventMessageList}
        {renderMobileMenu}
        {renderMenu}
      </div>
    );
  }
}

export default withStyles(styles)(Header);