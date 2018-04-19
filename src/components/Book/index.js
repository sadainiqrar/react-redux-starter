import React, {PropTypes} from 'react';
import styles from './styles.scss';


import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../redux/actions/bookActions'

import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class Book extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    bookid: "",
    book: []
	}
	
  }
	
  componentWillMount() {
	  
	  
    let query = this.props.params.id;
	
	this.props.actions.loadBook(query).then((book) =>
	{
		
	});
			
	 
  }
  componentWillReceiveProps(nextProps) {
	 
					
    if(nextProps.book !== this.props.book) {
		
		this.setState({bookid: nextProps.params.id});
		
		this.setState({book: nextProps.book});
	}
  }
	
	

  render() {
		
if(this.state.book.title)
{	
	  return(
	  <Card>
    
    <CardMedia
    >
      <img src={this.state.book.image_url[0]} alt="" />
    </CardMedia>
    <CardTitle title={this.state.book.title[0]} subtitle={this.state.book.authors[0].author[0].name[0]}  />
    <CardText>
          
		<p>Average Rating: {this.state.book.average_rating[0]}</p>
		
		<p>Rating Count: {this.state.book.ratings_count[0]}</p>
    </CardText>
  </Card>
	  )
}
else{
	return(
	 <div style={style.container}>
	 <center>
    <RefreshIndicator
      size={40}
	  left={0}
      top={20}
      status="loading"
      style={style.refresh}
    />
	</center>
  </div>
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
