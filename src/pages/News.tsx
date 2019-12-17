
import AppBar  from '../components/Appbar'
import Helmet from 'react-helmet';
import React, { Component } from 'react';


export interface NewsProps {
}


class News extends Component<NewsProps>{

  
  render() {
    
    
    return (
      <div> 
          <Helmet>
            <title>News</title>
          </Helmet>
          <AppBar title={"News"} isLoginPage={true} />  
      </div>
    );
  }
}

export default News;