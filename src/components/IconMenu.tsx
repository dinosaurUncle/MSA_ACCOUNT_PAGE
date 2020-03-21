import React, { Component} from 'react';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import MenuIcon from '@material-ui/icons/Menu';

const navigation = {
  brand: { name: "NavbarScroller", to: "/" },
  links: [
    { name: "Home", to: "/" },
    { name: "News", to: "/news" },
  ]
}
const StyledMenuItem = (theme: Theme) =>
    createStyles({
      root: {
        width: 230,
      },
    });

export interface IconMenuProps extends WithStyles<typeof StyledMenuItem> {
  menuProps?:MenuProps
  title?: string
  session?: any
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


  state:State = {
    isCheck : false,
    anchorEl: null
  }
  
  render() {
    const {classes, session} = this.props;
    console.log('IconMenu.session: ', session);
    const {brand, links} = navigation;
    
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

  const NavLinks: any = () => session.pages.map((page: { pageId: string, pageName: string, pageUrl: string}) =>
    <MenuItem key={page.pageId} component="a" href={page.pageUrl}><Typography variant="inherit">{page.pageName}</Typography></MenuItem>);
    return (
      <Paper className={classes.root}>
      <MenuList>
        <NavLinks />
      </MenuList>
    </Paper>
    );
  }
}

export default withStyles(StyledMenuItem)(IconMenu);