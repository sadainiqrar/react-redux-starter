import 'babel-polyfill';
import React from 'react';
import Router from 'react-router/lib/Router';
import routes from '../server/routes';

// We need a Root component for React Hot Loading.
function Root() {
  return <Router routes={routes} />;
}

export default Root;
