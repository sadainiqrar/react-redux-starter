import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './styles.scss';
import configureStore from '../../redux/store/configureStore';
import Header from '../Header';

const store = configureStore();

function App({ children }) {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <div>
          <div className={styles.content}>
            <Header />
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
