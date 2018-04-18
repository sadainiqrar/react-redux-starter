import React, {PropTypes} from 'react';
import styles from './styles.scss';


import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../redux/actions/bookActions'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



class Book extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    bookid: "",
    book: this.props.book
	}
	
  }
	
  componentWillMount() {
	  
	  
    let query = this.props.params.id;
	
    this.setState({bookid: query});
	this.props.actions.loadBook(query).then((book) =>
	{
		
	});
			
	 
  }
	
	

  render() {
		
		let book =  this.props.book;
		console.log("Book :", book)	
if(book.title)
{	
	  return(
	  <Card>
    
    <CardMedia
    >
      <img src={book.image_url[0]} alt="" />
    </CardMedia>
    <CardTitle title={book.title[0]} subtitle={book.authors[0].author[0].name[0]}  />
    <CardText>
          
		<p>Average Rating: {book.average_rating[0]}</p>
		
		<p>Rating Count: {book.ratings_count[0]}</p>
    </CardText>
  </Card>
	  )
}
else{
	return(
		<p>Loading</p>
	)
}
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	
	if(state.book){
			return {
					book: state.book
				}
		
	}
	else{
    return {
      book: {}
    }
	}
 
  
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);
