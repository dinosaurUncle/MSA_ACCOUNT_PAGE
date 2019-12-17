
import AppBar  from '../components/Appbar'
import React, { Component } from 'react';


export interface HomeProps {
}


class Home extends Component<HomeProps>{

  
  render() {
    
    
    return (
      <div> 
          <title>App</title>
          <AppBar title={"Home"} isLoginPage={true} />  
      </div>
    );
  }
}

export default Home;