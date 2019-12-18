import React, { Component } from 'react';
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




const StyledMenu = () => 
  createStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
});

const StyledMenu2 = (props:MenuProps) =>
{
  return (
    <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
  )
};

export interface MenuComponentProps extends WithStyles<typeof StyledMenu> {
  
}

class MenuComponent extends Component<MenuComponentProps> {
  render() {
    
    return <div></div>
  }
}

export default withStyles(StyledMenu)(MenuComponent);