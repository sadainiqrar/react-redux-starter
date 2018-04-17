import React, {PropTypes} from 'react';
import styles from './styles.scss';


import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../redux/actions/bookActions'


class Search extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    searchString: "",
    books: this.props.books,
	page: 1
	}
	
  }
	
  componentWillMount() {
	  
    let query = this.props.params.query;
	
    this.setState({searchString: query});
	
			this.props.actions.loadBooks({"query": query, "page": this.state.page}).then(()=>{
				
				
			})
	 
  }
	
	

  render() {
	   let books = [];
	  if(this.props.books[0])
	  {
		  if(this.props.books.length>0){
				if((this.props.books[0]["total-results"][0])>0)
				{
				
				
					books =  this.props.books[0].results[0].work;
				}
				else
				{
				
					this.state.books = [];
				
				};
		  }
		  
	  }
	  else{
			books = []
	  }
	  
	  if(books.length>0)
	  {
	 
    return (
			<ul className="list-group">
				{books.map(book => 
				<li className="list-group-item">
				<Link className={styles.link} to={"/book/" + book.best_book[0].id[0]._}>
            <strong>{book.best_book[0].title[0]}</strong>
          </Link></li>
				)}
			</ul>
    );
	  }
	  else{
		  return(
		<p>No Results found</p>
	  );
	  }
  }
}

Search.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
