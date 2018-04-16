import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import styles from './styles.scss';
import configureStore from '../../redux/store/configureStore';  
import { Provider } from 'react-redux';  

const store = configureStore();

function App({ children }) {
  return (
  <Provider store={store}>
    <div>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/">
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/tools">
            Tools
          </Link>
        </li>
      </ul>
      <div className={styles.content}>
        {children}
      </div>
    </div>
	</Provider>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
