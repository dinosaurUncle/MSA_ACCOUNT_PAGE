import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
          },
        },
    });
export interface LoginProps extends WithStyles<typeof styles> {}
export interface LoginStates {}


class Login extends Component<LoginProps>{

  render() {  
    const {classes} = this.props;
    return (
      <div style= {{textAlign: 'center', marginTop: "4%" }}> 
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField id="Id" label="ID" type="search" />
            </div>
            <div>
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />  
            </div>  
          </form>
      </div>
    );
  }
}

export default withStyles(styles)(Login);