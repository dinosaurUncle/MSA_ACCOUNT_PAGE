import React, { Component} from 'react';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import MenuIcon from '@material-ui/icons/Menu';


const StyledMenuItem = (theme: Theme) =>
    createStyles({
      root: {
        '&:focus': {
          backgroundColor: theme.palette.primary.main,
          '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
          },
        },
      },
    });

export interface IconMenuProps extends WithStyles<typeof StyledMenuItem> {
  menuProps?:MenuProps,
  title?: string
}


export interface State {
  isCheck:boolean,
  anchorEl:any
}

class IconMenu extends Component<IconMenuProps> {

  setAnchorEl(input:any){
    let menuIsOpen = true;
    console.log(input);
    if (input === null){
      menuIsOpen = false;
    } else {

    }
    this.setState({
      anchorEl:input,
      isCheck: menuIsOpen
    })
  }

  clickToLink = (url:string) => {
    let inputUrl = "/" + url;
    return (<a href={inputUrl}></a>)
  };

  state:State = {
    isCheck : false,
    anchorEl: null
  }
  
  render() {
    const {classes, menuProps, title} = this.props;
    let {isCheck} = this.state;
    
    

  const handleClick = (event:any) => {
    console.log(isCheck);
    console.log(event);
    isCheck = !isCheck;
    this.setState({
      isCheck :isCheck
    })
    this.setAnchorEl(event.currentTarget);
  };

  

  const handleClose = () => {
    this.setAnchorEl(null);
  };
    return (
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          <MenuIcon />
        </Button>
        <Menu
          elevation={30}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          {...menuProps}
          id="customized-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(isCheck)}
          onClose={handleClose}
        >
          <MenuItem className={classes.root} selected={title === "Home" ? true : false}>            
            <ListItem component="a" href="/">
              <ListItemIcon >
                <SendIcon fontSize="small"  />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </MenuItem>
          <MenuItem className={classes.root} selected={title === "News" ? true : false}>
            <ListItem component="a" href="/news">
              <ListItemIcon>
                <InboxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="News" />  
            </ListItem>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(StyledMenuItem)(IconMenu);