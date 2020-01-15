import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

const SearchIdstyles = (theme: Theme) =>
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
      validation: {
        margin: theme.spacing(1, 1, 1),
      },
      modalPaper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    });
   
export interface SearchIdProps extends WithStyles<typeof SearchIdstyles> {
  LoginStyle?:typeof SearchIdstyles
}
export interface Account {
  name : string
  email : string
}

export interface SearchIdState {
  id:string
  name:string
  open:boolean
}

const map = new Map< string | undefined, any>();

class SearchId extends Component<SearchIdProps>{

  state:SearchIdState = {
    id:'',
    name:'',
    open:false
  }

  onChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    map.set(e.currentTarget.name, e.currentTarget.value);
  }
  setOpen(input:boolean){
    this.setState({
      open: input
    })
  }

  render() {  
    const {classes} = this.props;

    const handleClose = () => {
      this.setOpen(false);
    }
    const onSubmit =
    (e: React.FormEvent<HTMLFormElement>) => {
      console.log('e1: ' ,e.currentTarget.name);
      e.preventDefault();
      console.log(map);

      let convertJson : Account = {
        name : map.get('name'),
        email : map.get('email'),
      };
      let jsonData = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(convertJson)};
        console.log(jsonData);
        fetch('/selectId', jsonData)
        .then(res => {
          res.json().then(
            data => {
              let result = JSON.stringify(data);
              let id = JSON.parse(result).id;
              this.setState({
                id: id,
                open: true
              });

            }
          )
        })
        .then(json => console.log(json))
        .catch(err => console.log(err));
        
    }
    const createAccountComplete = 
    () => {
      handleClose();
      window.location.replace("/login");
    }

    return (
      <div>
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={handleClose}
      >
        <div style={{ top: '50%' , left: '50%', transform: `translate(-50%, -50%)`}} className={classes.modalPaper}>
          <h2 id="simple-modal-title">회원가입 완료</h2>
          <p id="simple-modal-description">
            Id : {this.state.name} '님의 아이디는 ' {this.state.id != null ? ( '[' + this.state.id + "] 입니다" ) : ('존재 하지 않습니다')}
          </p>
          <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={createAccountComplete}
          className={classes.validation}>
            완료
          </Button>
        </div>
      </Modal>
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}></div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Id
        </Typography>
        <form className={classes.form} noValidate action={"/searchId"} method="POST" onSubmit={onSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            onChange={this.onChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={this.onChange}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Login
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

export default withStyles(SearchIdstyles)(SearchId);