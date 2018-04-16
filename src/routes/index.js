import React from 'react'
import { Router, IndexRoute, Route } from 'react-router'
import App from '../components/App';

import PropTypes from 'prop-types'



// Webpack 2 supports ES2015 `import()` by auto-
// chunking assets. Check out the following for more:
// https://webpack.js.org/guides/migrating/#code-splitting-with-es2015

const importHome = (nextState, cb) => {
  import(/* webpackChunkName: "home" */ '../components/Home')
    .then(module => cb(null, module.default))
    .catch(e => {
      throw e;
    });
};

const importTools = (nextState, cb) => {
  import(/* webpackChunkName: "tools" */ '../components/Tools')
    .then(module => cb(null, module.default))
    .catch(e => {
      throw e;
    });
};

const importSearch = (nextState, cb) => {
  import(/* webpackChunkName: "Search" */ '../components/Search')
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
    <Route path="tools" getComponent={importTools} />
    <Route path="search/:query" getComponent={importSearch} />
  </Route>
);


// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  require('../components/Home'); // eslint-disable-line global-require
  require('../components/Tools'); // eslint-disable-line global-require
  
  require('../components/Search'); // eslint-disable-line global-require
}

export default routes;
