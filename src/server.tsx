import path from 'path';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ChunkExtractor } from '@loadable/server';
import bodyParser from 'body-parser'
import http from 'http';
import request from 'request';



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


app.post('/postAcount', (req, res) => {
  console.log('post_req_body: ', req.body);
  console.log("json.body.name: " + req.body.name );
  let post_options = {
    headers: {'Content-Type': 'application/json'},
    url: '',
    body: JSON.stringify(req.body)
  };
  let result =null;
  const PORT = '8080';
  const BASE_PATH = '/account';
  const HOST = 'http://localhost';
  post_options.url = HOST + ":" + PORT + BASE_PATH;
  console.log('post_options: ' + post_options);
  let post_request = request.post(post_options, function(err, response, resultData){
    switch (err) {
      case 200:
        console.log("state 200: ",JSON.parse(resultData));
        result = resultData;
        return JSON.parse(resultData);
      default:
        console.log("state error: ",JSON.parse(resultData));
        result = resultData;
        return JSON.parse(resultData);
    }
  });
  console.log('post_request: ', post_request);
  res.json(result);
});

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