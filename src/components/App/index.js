import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import styles from './styles.scss';
import configureStore from '../../redux/store/configureStore';  
import { Provider } from 'react-redux';  


import Header from '../Header';  

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const store = configureStore();

function App({ children }) {
  return (
  
  <Provider store={store}>
  
  <MuiThemeProvider>
    <div>
	
      
      <div className={styles.content}>
	  
		<Header/>
		<div>
        {children}
		</div>
      </div>
    </div>
	
  </MuiThemeProvider>
	</Provider>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
