import React, { Component, useState } from 'react';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
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
  menuProps?:MenuProps
}


export interface State {
  isCheck:boolean
}

class IconMenu extends Component<IconMenuProps> {

  setAnchorEl(input:any){
    
  }

  state:State = {
    isCheck : false
  }
  
  render() {
    const {classes, menuProps} = this.props;
    let {isCheck} = this.state;
    let isClick:boolean = false;
    

  const handleClick = (event:any) => {
    console.log(isClick);
    console.log(event);
    isClick = !isClick;
    this.setState({
      isCheck :isClick
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
          elevation={0}
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
          
          keepMounted
          open={Boolean(isCheck)}
          onClose={handleClose}
        >
          <MenuItem className={classes.root}>
            <ListItemIcon>
              <SendIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </MenuItem>
          <MenuItem className={classes.root}>
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </MenuItem>
          <MenuItem className={classes.root}>
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Inbox"  />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(StyledMenuItem)(IconMenu);