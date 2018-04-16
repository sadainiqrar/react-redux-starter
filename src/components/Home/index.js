/*import React from 'react';
import styles from './styles.scss';

function Home() {
  return (
    <section>
      <p className={styles.paragraph}>
        Welcome to the <strong>Book Search App</strong>.
      </p>
      <div>
    		<input ref="search" type="search" placeholder="Search criteria" />
    		<button onClick={this.handleClick}>Go</button>
    	</div>
    </section>
  );
}

export default Home;
*/

import React, {PropTypes} from 'react';

import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BooksList from './BooksList';
import * as actions from '../../redux/actions/bookActions'




class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books,
	  value: ''
	}	  

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentWillMount() {
	  
	  
     this.props.actions.loadBooks(this.state.value);
	  
  }
 

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
	  
	  
	  this.props.actions.loadBooks(this.state.value);
	//this.props.actions.loadBooks();
	
	
    alert('A name was submitted: ' + this.state.value);
	
    event.preventDefault();
	
	
	
  }

  render() {
	  
    const books = this.props.books;
	
	console.log('Books: ', this.props.books);
    return (
    <section>
	<form onSubmit={this.handleClick}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        
			<input type='submit' value = 'submit'/>
			</form>
        <div className="col-md-12">
          <BooksList books={books[0]} />
        </div>
	  </section>
	  
	  
	  
	  
	  
    );
  }
}

Home.propTypes = {
  books: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
	
    return {
      books: state.books
    };
 
  
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);