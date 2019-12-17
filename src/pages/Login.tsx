
import AppBar  from '../components/Appbar'
import React, { Component } from 'react';


export interface LoginProps {
}


class Login extends Component<LoginProps>{

  
  render() {
    
    
    return (
      <div> 
          <title>Login</title>
          <AppBar title={"Login"} isLoginPage={false} />  
      </div>
    );
  }
}

export default Login;