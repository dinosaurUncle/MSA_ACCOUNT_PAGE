### 프로젝트 생성
예제로 아래 페이지를 따라하고 있음
https://medium.com/@minoo/react-typescript-ssr-code-splitting-%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-d8cec9567871

####명령어
<pre> 
1) dependency 추가함
yarn add @material-ui/core
yarn add @material-ui/icons

2) 폰트 추가(html의 head 부분에 추가함)
< link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" / >

3) 아이콘 추가
< link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" / >
</pre>

#### 폴더구조
<pre>
프로젝트 폴더
 - dist
 - public
    * index_dev.html
 - src
    - components
      * Footer.tsx
      * Header.tsx
    - pages
      * Home.tsx
      * News.tsx
    * App.tsx
    * index.tsx
    * server.tsx
* babel.config.js
* package.json
* tsconfig.json
* wepack.config.js
* webpack.dev.js
* yarn.lock
</pre>


#### 파일 내용

1. server.tsx 추가됨
2. webpack.server.js 추가됨
3. webpack.client.js 추가됨
4. package.json 
<pre>
{
  "dependencies": {
    "express": "^4.17.1",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-helmet": "^5.2.1",
    "react-router-dom": "^5.1.2",
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
    "@types/express": "^4.17.2",
    "@types/react": "^16.9.16",
    "@types/react-dom": "^16.9.4",
    "@types/react-helmet": "^5.0.14",
    "@types/react-router-dom": "^5.1.3",
    "@types/webpack-dev-middleware": "^2.0.3",
    "@types/webpack-env": "^1.14.1",
    "@types/webpack-hot-middleware": "^2.25.0",
    "babel-loader": "^8.0.6",
    "html-webpack-plugin": "^3.2.0",
    "ts-loader": "^6.2.1",
    "tslint": "^5.20.1",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10",
    "webpack-dev-middleware": "^3.7.2",
    "webpack-dev-server": "^3.9.0",
    "webpack-hot-middleware": "^2.25.0",
    "webpack-node-externals": "^1.7.2"
  },
  "scripts": {
    "start": "yarn build:dev && node ./dist/server.js",
    "start:wds": "webpack-dev-server --env=dev --profile --colors",
    "build:dev": "rm -rf dist/ && NODE_ENV=development yarn build:client && NODE_ENV=development yarn build:server",
    "build:server": "webpack --env=server --progress --profile --colors",
    "build:client": "webpack --env=client --progress --profile --colors"
  }
}
</pre>