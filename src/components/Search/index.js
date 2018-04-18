import React, {PropTypes} from 'react';
import styles from './styles.scss';


import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../redux/actions/bookActions'


import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


class Search extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    searchString: "",
    books: this.props.books,
	page: 1
	}
	this.handleItemClick = this.handleItemClick.bind(this);
  }
	
  componentWillMount() {
	  
    let query = this.props.params.query;
	
    this.setState({searchString: query});
	
			this.props.actions.loadBooks({"query": query, "page": this.state.page}).then(()=>{
				
			})
	 
  }
  
  handleItemClick(i){
	  
	this.props.history.push('/book/' + i);
	  
	  
  }
 
  onPaginate()
  {
	  let query = this.props.params.query;
	
    this.setState({page: page+1});
	
			this.props.actions.loadBooks({"query": query, "page": this.state.page}).then(()=>{
				
					this.setState({books: books.concat(this.props.books[0].results[0].work)});
			})
  }
	

  render() {
	   let books = [];
	   let total = 0;
	  if(this.props.books[0])
	  {
		  if(this.props.books.length>0){
				if((this.props.books[0]["total-results"][0])>0)
				{
				
				
					books =  this.props.books[0].results[0].work;
					total = this.props.books[0]["total-results"][0];
					console.log("Stated Books: ", this.state.books)
					
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
      <List>
        <Subheader>{total + " Books Found"}</Subheader>
		{books.map((book,index) =>
			<ListItem
			onClick={this.handleItemClick.bind(this, book.best_book[0].id[0]._)}
			key={index}
          leftAvatar={<Avatar src={book.best_book[0].small_image_url[0]} />}
          primaryText={book.best_book[0].author[0].name[0]}
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>{book.best_book[0].title[0]}</span>
            </p>
          }
          secondaryTextLines={2}
			/>
		)}
      </List>
   
	
	
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
