import * as express from "express"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server'
import login from '../page/login'


class Router {
  public app: express.Application;
  constructor (app: express.Application){
    this.app = app;
    this.defaultPath();
  }

  defaultPath: Function = () =>{
    this.app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      /*  
      ReactDOMServer.renderToNodeStream(
          
          <Html>
            
          </Html>
          
        )
        */
    });
  };
}

export default Router;