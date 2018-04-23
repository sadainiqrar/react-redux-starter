import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../../client/components/App';

// Webpack 2 supports ES2015 `import()` by auto-
// chunking assets. Check out the following for more:
// https://webpack.js.org/guides/migrating/#code-splitting-with-es2015

const importHome = (nextState, cb) => {
  import(/* webpackChunkName: "home" */ '../../client/components/Home')
    .then(module => cb(null, module.default))
    .catch(e => {
      throw e;
    });
};

const importSearch = (nextState, cb) => {
  import(/* webpackChunkName: "Search" */ '../../client/components/Search')
    .then(module => cb(null, module.default))
    .catch(e => {
      throw e;
    });
};

const importBook = (nextState, cb) => {
  import(/* webpackChunkName: "Search" */ '../../client/components/Book')
    .then(module => cb(null, module.default))
    .catch(e => {
      throw e;
    });
};

// We use `getComponent` to dynamically load routes.
// https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
const routes = (
  <Route path="/" component={App}>
    <IndexRoute getComponent={importHome} />
    <Route path="search/:query" getComponent={importSearch} />
    <Route path="book/:id" getComponent={importBook} />
  </Route>
);

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  require('../../client/components/Home'); // eslint-disable-line global-require
  require('../../client/components/Search'); // eslint-disable-line global-require
  require('../../client/components/Book'); // eslint-disable-line global-require
}

export default routes;
