import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

function Header() {
  return (
    <AppBar
      title={<span style={styles.title}>Book Search App</span>}
      iconElementRight={<FlatButton containerElement={<Link to="/" />} label="Home" />}
      iconElementLeft={<IconButton iconClassName="muidocs-icon-custom-github" disabled />}
    />
  );
}

export default Header;
