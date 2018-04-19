import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import {Link, browserHistory} from 'react-router';

const styles = {
  title: {
    cursor: 'pointer',
  },
};
function handleClick(event) {
}

function Header(props) {
	
  return (
  <AppBar
    title={<span style={styles.title}>Book Search App</span>}
	onTitleClick={handleClick}
	iconElementRight = {
      <FlatButton
  containerElement={<Link to="/" />}
	label="Home"/>
	}
	iconElementLeft={<IconButton iconClassName="muidocs-icon-custom-github" disabled={true} />}
  />
  
  );
}

export default Header;
