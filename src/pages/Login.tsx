
import AppBar  from '../components/Appbar'
import Helmet from 'react-helmet';
import React, { Component } from 'react';


export interface LoginProps {
}


class Login extends Component<LoginProps>{

  
  render() {
    
    
    return (
      <div> 
        <Helmet>
          <title>Login</title>
        </Helmet>
        <AppBar title={"Login"} isLoginPage={false} />  
      </div>
    );
  }
}

export default Login;