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
import { bookApi } from '../../api/bookApi';

import * as actions from '../../redux/actions/bookActions'




class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		
	  isLoading: false,
      books: this.props.books,
	  value: ''
	}	  

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentWillMount() {
	  
	 
	  
  }
 

  handleChange(event) {
	
			//this.props.actions.CancelRequest()
    this.setState({isLoading: true});
    this.setState({value: event.target.value})
	console.log("Props: ", this.props)
			this.props.actions.loadBooks(event.target.value).then(()=>{
				
				
				this.setState({isLoading: false});
			})
			
	
	
	
	
	
    //this.setState({isLoading: false});
	  
	
    event.preventDefault();
  }

  handleClick(event) {
	  
	//this.props.actions.loadBooks();
	
	
    alert('A name was submitted: ' + this.state.value);
	console.log("Props: ",this.props);
	this.props.history.push('/search/' + this.state.value);
    event.preventDefault();
	
	
	
	
  }

  render() {
	  let books = [];
	  if(this.props.books[0])
	  {
		  books = this.props.books;
		  
	  }
	  else{
			books = []
	  }
	
	console.log('Books: ', this.props.books);
    return (
    <section>
	<form onSubmit={this.handleClick}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        
			<input type='submit' value = 'submit'/>
			</form>
        <div className="col-md-12">
		{!this.state.isLoading ? (
          <BooksList books={books} />
		  ) : ( <p>Loading</p>)
		}
        </div>
	  </section>
    );
  }
}

Home.propTypes = {
  books: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
	
	if(state.books){
			return {
					books: state.books
				}
		
	}
	else{
    return {
      books: []
    }
	}
 
  
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);