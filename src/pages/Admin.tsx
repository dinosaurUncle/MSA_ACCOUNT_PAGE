
import React, { Component } from 'react';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const styles = (theme: Theme) =>
    createStyles({
      root: {
        marginTop: 15,
        flexGrow: 1
      },
      tabs: {
        backgroundColor: "#2196f3"
      }
    });


export interface TabPanel {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props:TabPanel) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
function a11yProps(index:any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export interface AdminStates {
  value: any
}
export interface AdminProps extends WithStyles<typeof styles> {}

class Admin extends Component<AdminProps>{
  state:AdminStates = {
    value: 0
  }
  render() {
    const {classes} = this.props;
    const handleChange = (event:any, newValue:any) =>{
      this.setState({
        value : newValue
      });
    }
    
    return (
      <div className={classes.root}>
        
        <Tabs  value={this.state.value} onChange={handleChange} aria-label="simple tabs example">
          <Tab className={classes.tabs} label="계정 관리" {...a11yProps(0)} />
          <Tab className={classes.tabs} label="페이지 관리" {...a11yProps(1)} />
          <Tab className={classes.tabs} label="권한 관리" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={this.state.value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          Item Three
        </TabPanel>
      </div>
    );
  }
}
export default withStyles(styles)(Admin);
