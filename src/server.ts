import 'source-map-support/register';
import App from './component/App';
import Router from './router/Router';
import * as express from "express";

const port: number = Number(process.env.PORT) || 3000;
const app: express.Application = App.bootstrap().app;
const router = new Router(app);


app.listen(port, ()=> console.log('Express server listening at ', port))
.on('error', err => console.error(err));