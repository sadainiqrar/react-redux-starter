import React from 'react';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import routes from '../routes';

import { connect } from 'react-redux';
import 'babel-polyfill';   
import { render } from 'react-dom';  

// We need a Root component for React Hot Loading.
function Root() {
  return (
    <Router routes={routes} />
  );
}

export default Root;
