### 프로젝트 생성
예제로 아래 페이지를 따라하고 있음
https://medium.com/@minoo/react-typescript-ssr-code-splitting-%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-d8cec9567871

####명령어
<pre> 
1) dependency 추가함
yarn add react react-dom typescript
yarn add --dev @babel/cli @babel/core @babel/node @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime @babel/polyfill @babel/preset-env @babel/preset-typescript @types/react @types/react-dom @types/react @types/react-dom tslint

2) tsconfig.json 파일 생성
node_modules/.bin/tsc --init

3) dependency 추가함
yarn add --dev webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader ts-loader
</pre>

#### 폴더구조
<pre>
프로젝트 폴더
 - dist
 - public
    * index_dev.html
 - src
    - components
    - pages
    * App.tsx
    * index.tsx
* babel.config.js
* package.json
* tsconfig.json
* wepack.config.js
* webpack.dev.js
* yarn.lock
</pre>


#### 파일 내용
1. src/App.tsx
<pre>
import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div>App</div>
        );
    }
}

export default App;
</pre>

2. src/index.tsx
<pre>
import ReactDOM from 'react-dom';
import React from 'react';

import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
</pre>

3. babel.config.js
<pre>
module.exports = {
  presets: [
    "@babel/preset-react",
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
};
</pre>

4. package.json
<pre>
{
  "dependencies": {
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "typescript": "^3.7.3"
  },
  "devDependencies": {
    "@babel/cli": "^7.7.5",
    "@babel/core": "^7.7.5",
    "@babel/node": "^7.7.4",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@babel/plugin-transform-runtime": "^7.7.6",
    "@babel/polyfill": "^7.7.0",
    "@babel/preset-env": "^7.7.6",
    "@babel/preset-react": "^7.7.4",
    "@babel/preset-typescript": "^7.7.4",
    "@types/react": "^16.9.16",
    "@types/react-dom": "^16.9.4",
    "babel-loader": "^8.0.6",
    "html-webpack-plugin": "^3.2.0",
    "ts-loader": "^6.2.1",
    "tslint": "^5.20.1",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.9.0"
  },
  "scripts": {
    "start": "webpack-dev-server --env=dev --profile --colors"
  }
}
</pre>

5. tsconfig.json
<pre>
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "preserve",
    "sourceMap": true,
    "outDir": "./ts-dist",
    
    "strict": true,
    "noImplicitAny": true,
    
    "moduleResolution": "node",
    "baseUrl": "./",
    "esModuleInterop": true,
    
    "plugins": [
      {
        "name": "typescript-tslint-plugin",
        "alwaysShowRuleFailuresAsWarnings": false,
        "ignoreDefinitionFiles": true,
        "configFile": "./tslint.json",
        "suppressWhileTypeErrorsPresent": false,
        "mockTypeScriptVersion": false
      }
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
</pre>

6. webpack.config.js
<pre>
module.exports = function(env) {
  return require(`./webpack.${env}.js`);
};
</pre>

7. webpack.dev.js
<pre>
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  
  entry: './src/index.tsx',
  
  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index_dev.html',
    }),
  ],
}
</pre>