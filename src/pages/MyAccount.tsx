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
import Button from '@material-ui/core/Button';
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
      submit: {
        width: "20%",
        marginLeft: 20,
        margin: theme.spacing(3, 0, 2),
      },
    });
interface MyAccountProps extends WithStyles<typeof styles> {
  session? : any
}
interface MyAccountStates {
  account : Account
}
interface Account {
  accountId : string
  accountName? : string
  password? : string
  gender? : string
  email? : string
  phone? : string
  targetAccountId? : string
}



class MyAccount extends Component<MyAccountProps>{

  state: MyAccountStates = {
    account:this.props.session.account
  }
  
  render() {  
    const {classes} = this.props;

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
      let stateId: string = e.target.id;
      let accountObj:Account = this.state.account;
      
      switch (stateId){
        case "accountName" :
          accountObj.accountName = e.target.value; 
          break;
        case "email" :
          accountObj.email = e.target.value;
          break;
        case "phone" :
          accountObj.phone = e.target.value;
          break;      
      }
      this.setState({
        account : accountObj
      });
      
    }

    const onSetValue = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) =>{
      let stateName: string | undefined = e.target.name;
      if (!(stateName == undefined)){
        let accountObj:Account = this.state.account;
        let genderValue:any = e.target.value;;
        accountObj.gender = genderValue;
        this.setState({
          account : accountObj
        });
      }
    }

    const onSubmit =
    (e: React.FormEvent<HTMLFormElement>) => {
      console.log('e1: ' ,e.currentTarget.name);
      e.preventDefault();
      console.log('this.state: ', this.state);
      let convertJson : Account = {
        accountId : this.state.account.accountId,
        accountName : this.state.account.accountName,
        gender : this.state.account.gender,
        email : this.state.account.email,
        phone : this.state.account.phone,
        targetAccountId : this.state.account.accountId
      };
      console.log('convertJson: ', convertJson);
      let jsonData = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(convertJson)};
        console.log(jsonData);
        fetch('/eachAccountUpdate', jsonData)
        .then(res => {
          res.json().then(
            data => {
              let result = JSON.stringify(data);
              console.log(JSON.parse(result));
              let account:Account = JSON.parse(result)
              this.setState({account})
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
                  <TextField required id="accountId" label="ID" defaultValue={this.state.account.accountId} onChange={onChange} disabled />
                  <TextField required id="accountName" label="Name" defaultValue={this.state.account.accountName} onChange={onChange} />
                  <TextField required id="email" label="Email" defaultValue={this.state.account.email} onChange={onChange} />
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="gender"
                      fullWidth
                      value={this.state.account.gender}
                      name="gender"
                      onChange={onSetValue}
                      >
                      <MenuItem value={'MALE'}>남</MenuItem>
                      <MenuItem value={'FEMALE'}>여</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField required id="phone" label="Phone" defaultValue={this.state.account.phone} onChange={onChange} />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >Update
                  </Button>
                </div>
              </div>
            </form>
      </div>
    );
  }
}

export default withStyles(styles)(MyAccount);