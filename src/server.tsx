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

function ServerApiCall(req: any, domain: string, method:HTTPMethod){
  let result =null;
  const PORT = '8080';
  const HOST = 'http://localhost';
  let url = HOST + ":" + PORT + domain;
  let bodyData = {};
  if (method == HTTPMethod.POST || method == HTTPMethod.PUT) {
    bodyData = {json: req.body}
  }
  let post_request = request(method, url, bodyData)
  result = JSON.parse(post_request.getBody('utf8'));
  console.log('ServerApiCall result: ', result);
  return result;
}

const app = express();
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.client.js');

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackConfig);

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
  console.log('log: ' + req.url);
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: App } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({ statsFile: webStats });

  const context = {};
  let value = true;
  const jsx = webExtractor.collectChunks(
    <StaticRouter location={req.url} context={context}>
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
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
          ${helmet.title.toString()}
          ${webExtractor.getLinkTags()}
          ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
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
  console.log('test2222');
  res.json(ServerApiCall(req, '/account/login', HTTPMethod.POST));
});