import * as express from "express"

class App {
  public app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor (){
    this.app = express();
  }
}

export default App;