### 프로젝트 생성
예제로 아래 페이지를 따라하고 있음
https://medium.com/@minoo/react-typescript-ssr-code-splitting-%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-d8cec9567871

####명령어
<pre> 
1) dependency 추가함
yarn add react-router-dom react-helmet
yarn add --dev @types/react-router-dom @types/react-helmet
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
* babel.config.js
* package.json
* tsconfig.json
* wepack.config.js
* webpack.dev.js
* yarn.lock
</pre>


#### 파일 내용

1. index.tsx
<pre>
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
</pre>


2. App.tsx
<pre>
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

import Home from './pages/Home';
import News from './pages/News';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>App</title>
        </Helmet>
        <Route path="/" render={() => <Header />} />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/news" render={() => <News />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
</pre>

3. Header.tsx
<pre>
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">Home</Link>
    <Link to="/news">News</Link>
  </header>
);

export default Header;
</pre>

4. Footer.tsx
<pre>
import React from 'react';

const Footer = () => <footer>Footer</footer>;

export default Footer;
</pre>

5. Home.tsx
<pre>
import React from 'react';

const Home = () => <div>Home</div>;

export default Home;
</pre>

6. News.tsx
<pre>
import React from 'react';
import Helmet from 'react-helmet';

const News = () => (
  <div>
    <Helmet>
      <title>News</title>
    </Helmet>
    News
  </div>
);

export default News;
</pre>