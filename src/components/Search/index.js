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
	isLoading: false,
    searchString: " ",
    books: [],
	page: 1,
	total: 0,
	totalPage: 0
	}
	this.handleItemClick = this.handleItemClick.bind(this);
	this.onLoadMore = this.onLoadMore.bind(this);
  }
	
  componentDidMount() {
	  
    let query = this.props.params.query;
	
	
			this.props.actions.loadBooks({"query": query, "page": this.state.page}).then(()=>{
				
			})
	 
  }
  
  handleItemClick(i){
	  
	this.props.history.push('/book/' + i);
	  
	  
  }
  componentWillReceiveProps(nextProps) {
	  
	this.setState({searchString: nextProps.params.query});
					
    if(nextProps.books !== this.props.books) {
		
	  if(nextProps.books[0])
	  {
		  if(nextProps.books.length>0){
				if((nextProps.books[0]["total-results"][0])>0)
				{
					this.setState({books: this.state.books.concat(nextProps.books[0].results[0].work)});
					
					this.setState({total: nextProps.books[0]["total-results"][0]});
					
					console.log("Stated Books: ", nextProps.books)
					let tPages = ((nextProps.books[0]["total-results"][0])%20) === 0 ? ((nextProps.books[0]["total-results"][0])/20) : Math.floor(((nextProps.books[0]["total-results"][0])/20)+1);
					
					this.setState({totalPage: tPages});
				}
				else
				{
				
					this.setState({books: []});
					
				
				};
		  }
		  
	  }
	  else{
			
					this.setState({books: []});
	  }
		
		
		
		
		
    }
  }
  onLoadMore()
  {
	  console.log("Load More")
	  if(this.state.page <= this.state.totalPage)
	  {
	  this.props.actions.loadBooks({"query": this.state.searchString, "page": (this.state.page+1)}).then(()=>{
				 
				})
	 
	  
	  
					this.setState({page: (this.state.page+1)});
	  }
	  
  }
	

  render() {
	   
	  console.log("Books Length", this.state.books)
	  if(this.state.books.length>0)
	  {
		  if((this.state.total)>0)
		  {
	 
    return (
	<div>
      <List>
        <Subheader>{this.state.total + " Books Found"}</Subheader>
		{this.state.books.map((book,index) =>
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
	   {this.state.page <= this.state.totalPage ? (
	   
			<button onClick={this.onLoadMore}>
            Load More
          </button>
      ) : (
	  <p></p>
      )}
	</div>
   
	
	
    );
	  }
	  else
	  {
		 return(
		  <div>
		  <center>
		<h1>No Results found</h1>
		</center>
		</div>
	  ); 
	  }
	  }
	  else{
		  return(
		  <div>
		  <center>
		<h1>No Results found</h1>
		</center>
		</div>
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
