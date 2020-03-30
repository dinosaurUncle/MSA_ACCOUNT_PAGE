import path from 'path';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ChunkExtractor } from '@loadable/server';
import bodyParser from 'body-parser'
import request from 'sync-request';
import HTTPMethod from 'http-method-enum';
import session from 'express-session';
import urlencode from 'urlencode';



function ServerApiCall(req: any, domain: string, method:HTTPMethod){
  let result =null;
  const PORT = '8089';
  const HOST = 'http://localhost';
  let url = HOST + ":" + PORT + domain;
  let bodyData = {};
  if (method == HTTPMethod.POST || method == HTTPMethod.PUT) {
    bodyData = {json: req.body}
  }
  console.log('url: ', url);
  let post_request = request(method, url, bodyData)
  result = JSON.parse(post_request.getBody('utf8'));
  console.log('ServerApiCall result: ', result);
  return result;
}

function getSessionSetting(req: any){
  const sess = req.session as MySession;
  let result = null;
  if (sess.pages == null){
    console.log('getMenuList api call!');
    result = ServerApiCall(null, '/account_page/page/' + sess.account.accountId, HTTPMethod.GET);
    sess.pages = result.pages;
    result = ServerApiCall(null, '/eventMessage/' + sess.account.accountId, HTTPMethod.GET);
    sess.eventMessage = result;
  } 
}

interface MySession extends Express.Session {
  login: boolean;
}

const app = express();
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.client.js');

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackConfig);

  app.use(session({
    secret: "i-love-husky",
    resave: false,
    saveUninitialized: true
   }));

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'silent',
      publicPath: webpackConfig[0].output.publicPath,
    }),
  );

  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname)));

app.get('*', (req, res) => {
  const sess = req.session as MySession;
  console.log('log: ' + req.url);
  console.log("login: ", sess.login);
  if (sess.login) {
    getSessionSetting(req);
  }
  
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: App } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  
  const context = {};
  const jsx = webExtractor.collectChunks(
    <StaticRouter location={req.url} context={context} >
      <App />
    </StaticRouter>
  );

  const html = renderToString(jsx);
  const helmet = Helmet.renderStatic();
  res.set('content-type', 'text/html');
  res.send(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
          ${helmet.title.toString()}
          ${webExtractor.getLinkTags()}
          ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
          <div style="visibility:hidden" id="session">${JSON.stringify(sess)}</div>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
  `);
});

app.listen(3003, () => console.log('Server started http://localhost:3003'));

/**
 * 2019/12/30
 * API 통신 컨트롤러
 */

 // 1. 유효성검사
 app.post('/isId', (req, res) => {
  res.json(ServerApiCall(req, '/account/isId/' + req.body.id, HTTPMethod.GET));
});

// 2. 회원가입
app.post('/createAcount', (req, res) => {
  console.log('test11');
  res.json(ServerApiCall(req, '/account', HTTPMethod.POST));
});



// 3. 로그인 
app.post('/login', (req, res) => {
  let result = ServerApiCall(req, '/account/login', HTTPMethod.POST);
  console.log('server.login: ', result.login); 
  console.log('server.result: ', result); 
  const sess = req.session as MySession;
  sess.login = result.login;
  sess.account = result.account;
  res.json(result);
});

// 4. 로그아웃 
app.post('/logout', (req, res) => {
  const sess = req.session as MySession;
  sess.login = false;
  sess.account = null;
  sess.pages = null;
  res.json(null);
});


// 5. 아이디 찾기
app.post('/selectId', (req, res) => {
  console.log('selectId');
  res.json(ServerApiCall(req, '/account/selectId/' + urlencode(req.body.name) + "/" + req.body.email
  , HTTPMethod.GET));
});

// 6. 이벤트 메세지 확인
app.put('/eventMessageCheck', (req, res) => {
  const sess = req.session as MySession;
  console.log('eventMessageCheck');
  let result = ServerApiCall(req, '/eventMessage', HTTPMethod.PUT)
  sess.eventMessage = result;
  res.json(result);
});
//7. 전체 회원 리스트 조회
app.post('/getAccountList', (req, res) => {
  console.log('getAccountList');
  let result = ServerApiCall(req, '/account', HTTPMethod.GET)
  console.log('getAccountList.result: ', result);
  res.json(result);
});

