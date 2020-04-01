import React, { Component } from 'react';
import { createStyles, WithStyles, withStyles} from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
const styles = (theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        maxWidth: 1000,
        marginLeft: 20,
        marginTop: 20
      },
      form: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        
        border: '2px solid #000',
      },
      innerForm: {
        margin: 30
      },
      formControl: {
        margin: theme.spacing(1),
        width: "20%"
      },
    });
interface MyAccountProps extends WithStyles<typeof styles> {
  session? : any
}
interface MyAccountStates {}
interface Account {
  accountId: string
  accountName?: string
  password? : string
  gender?: string
  email?: string
  phone?: string
}



class MyAccount extends Component<MyAccountProps>{
  state: Account = {
    accountId : this.props.session.account.accountId,
    accountName : this.props.session.account.accountName,
    password : this.props.session.account.password,
    gender : this.props.session.account.gender,
    email : this.props.session.account.email,
    phone : this.props.session.account.phone
    
  }

  onChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    console.log(e.currentTarget);
    
  }

  onSetValue(e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>){
    
    let stateName: string | undefined = e.target.name;
    if (!(stateName == undefined)){
      this.setState({
        stateName : e.target.value
      });
    }
  }
  
  render() {  
    const {classes} = this.props;

    const onSubmit =
    (e: React.FormEvent<HTMLFormElement>) => {
      console.log('e1: ' ,e.currentTarget.name);
      e.preventDefault();

      let convertJson : Account = {
        accountId : this.state.accountId,
        accountName : this.state.accountName,
        gender : this.state.gender,
        email : this.state.email,
        phone : this.state.phone
      };
      let jsonData = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(convertJson)};
        console.log(jsonData);
        fetch('/createAcount', jsonData)
        .then(res => {
          res.json().then(
            data => {
              let result = JSON.stringify(data);
              console.log(JSON.parse(result));
              let id = JSON.parse(result).account.id;
              let state = JSON.parse(result).state;
              this.setState({
                id: id,
                isPass : state,
                open: true
              })
            }
          )
        })
        .then(json => console.log(json))
        .catch(err => console.log(err));
        
    }

    return (
      <div className={classes.root}> 
          <Typography variant="h4" gutterBottom>
            My Account
          </Typography> 
          
          
            <form className={classes.form} noValidate autoComplete="off" 
            action={"/accountUpdate"} method="POST" onSubmit={onSubmit}>
              <div className={classes.innerForm}>
                <div>
                  <TextField required id="standard-required" label="ID" defaultValue={this.state.accountName} />
                  <TextField autoComplete="name" name="name" variant="outlined" required fullWidth
                        id="name" label="Name" onChange={this.onChange} autoFocus />
                  <TextField required id="standard-required" label="email" defaultValue="m05214" />
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      value={null}
                      name="gender"
                      onChange={this.onSetValue}
                      >
                      <MenuItem value={'MALE'}>남</MenuItem>
                      <MenuItem value={'FEMALE'}>여</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField required id="standard-required" label="phone" defaultValue="010-1111-2222" />
                </div>
              </div>
            </form>
      </div>
    );
  }
}

export default withStyles(styles)(MyAccount);