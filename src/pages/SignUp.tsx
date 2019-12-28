import React, { Component, FormEvent } from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router-dom';

const SignUpstyles = (theme: Theme) =>
    createStyles({
      paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: "100%",
      },
    });
const test = () =>{
  alert('test');
}
   
export interface SignUpProps extends WithStyles<typeof SignUpstyles> {
  LoginStyle?:typeof SignUpstyles
  formAction?:any
}

export interface State {
  description:any
  jsonData?:any
}

export interface Account {
  id: string
  name : string
  password : string
  gender : string
  email : string
  phone : string
}

const map = new Map< string | undefined, any>();



class SignUp extends Component<SignUpProps>{

  state:State = {
    description: null,
    jsonData: null
  }

  onChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    console.log(e.currentTarget);
    map.set(e.currentTarget.name, e.currentTarget.value);
  }
  onSetValue(e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>){
    e.target.name
    map.set(e.target.name, e.target.value);
  }

  render() {  
    const {classes} = this.props;
    const onSubmit =
    (e: React.FormEvent<HTMLFormElement>) => {
      console.log('e1: ' ,e.currentTarget.name);
      e.preventDefault();
      console.log(map);

      let convertJson : Account = {
        id : map.get('id'),
        name : map.get('name'),
        password : map.get('password'),
        gender : map.get('gender'),
        email : map.get('email'),
        phone : map.get('phone')
      };
      let jsonData = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(convertJson)};
        console.log(jsonData);
        this.setState({
          jsonData: jsonData
        })
        fetch('/postAcount', jsonData)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
        
    }
    return (
      <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} name="accountJoin" noValidate action={"/postAcount"} method="POST" onSubmit={onSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="id"
                name="id"
                variant="outlined"
                required
                fullWidth
                id="id"
                label="Id"
                onChange={this.onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                onChange={this.onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.onChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth
                  value={null}
                  name="gender"
                  onChange={this.onSetValue}>

                  <MenuItem value={'MALE'}>남</MenuItem>
                  <MenuItem value={'FEMALE'}>여</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={this.onChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                onChange={this.onChange}
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
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

export default withStyles(SignUpstyles)(SignUp);