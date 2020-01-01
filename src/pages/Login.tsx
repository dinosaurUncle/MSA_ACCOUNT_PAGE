import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CSS from 'csstype';

const Loginstyles = (theme: Theme) =>
    createStyles({
      paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    });
    const map = new Map< string | undefined, any>();
    
    export interface LoginType {
      id: string
      password : string
    }    

export interface LoginProps extends WithStyles<typeof Loginstyles> {
  LoginStyle?:typeof Loginstyles
}

class Login extends Component<LoginProps>{

  onChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    map.set(e.currentTarget.name, e.currentTarget.value);
  }

  render() {  
    const {classes} = this.props;
    
    return (
      <div>
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}></div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="Id"
            name="id"
            onChange={this.onChange}
            autoComplete="Id"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={this.onChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/searchpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
    );
  }
}

export default withStyles(Loginstyles)(Login);