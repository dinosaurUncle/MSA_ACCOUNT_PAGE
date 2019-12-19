import React, { Component } from 'react';
import Home from "../pages/Home";
import Login from "../pages/Login";
import News from "../pages/News";


export interface BodyProps {
pageName:string
}


class Body extends Component<BodyProps>{


  render() {
    const {pageName} = this.props;
    let content: any = null;
    if (pageName === "Home") {
      content = (<Home />)
    } else if (pageName === "Login") {
      content = (<Login />)
    } else if (pageName === "News") {
      content = (<News />)
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Body;