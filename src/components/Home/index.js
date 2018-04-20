
import React, {PropTypes} from 'react';

import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BooksList from './BooksList';
import { bookApi } from '../../api/bookApi';

import * as actions from '../../redux/actions/bookActions'

import AutoComplete from 'material-ui/AutoComplete';

import RaisedButton from 'material-ui/RaisedButton';


const style = {
  margin: 12,
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		
	  isLoading: false,
      books: this.props.books,
	  booksData: [],
	  value: "",
	  total: 0,
	  query: ""
	}	  
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeAuto = this.handleChangeAuto.bind(this);
	
	//this.onNewRequest = this.onNewRequest.bind(this);
  }
  
  componentWillMount() {
	  
	 
	  
  }
 
	
  componentWillReceiveProps(nextProps) {
	  
					
    if(nextProps.books !== this.props.books) {
		if(nextProps.books[0])
	  {
		  if(nextProps.books.length>0){
				if((nextProps.books[0]["total-results"][0])>0)
				{
					
					this.setState({value: nextProps.books[0].query[0]})
					this.setState({total:nextProps.books[0]["total-results"][0]})
					this.setState({books:nextProps.books[0].results[0].work})
					
					this.setState({query:nextProps.books[0].query[0]})
					
					let bookData = nextProps.books[0].results[0].work.filter((i, index) => (index < 5)).map(book => 
											{
												return {name: book.best_book[0].title[0],code: book.best_book[0].id[0]._,q:""};
											})
					if(nextProps.books[0]["total-results"][0]>5)
					{
						bookData.push({name:(((nextProps.books[0]["total-results"][0]) - 5) + " Other Results"),code:"search",q: this.state.query});
					}
					
					this.setState({booksData: bookData})
											
					
				}
				else
				{
				
						this.setState({books:[]})
				
				};
		  }
		  
	  }
	  else
	  {
		  this.setState({books:[]})
	  }
	}
  }
  
 

  handleChangeAuto(event) {
	
			//this.props.actions.CancelRequest()
			this.props.actions.loadBooks({"query": event, "page": 1}).then(()=>{
				
				
			})
			
	this.setState({value: event})
	
	
	
	
	
    //this.setState({isLoading: false});
	  
	
   // event.preventDefault();
  }
  onNewRequest(chosenRequest, index) {
	if(chosenRequest.code === "search")
	{
		this.props.history.push('/search/' + this.state.query);
	}
	else
	{
		
		this.props.history.push('/book/' + chosenRequest.code);
	}
    
	}
  
  handleClick(event) {
	  
	//this.props.actions.loadBooks();
	
	if(this.state.value.length>0)
	{
	this.props.history.push('/search/' + this.state.value);
    event.preventDefault();
	}
	else{
	 
     event.preventDefault();
	}
	
	
	
	
  }
  
	
  render() {
	  
	  
	
		let config = { text: 'name', value: 'code',option:'q'}
	
		
    return (
    <section>
	<div>
			<AutoComplete
          hintText="Search Book"
		  filter = { AutoComplete.noFilter }
          dataSource={this.state.booksData}
		  dataSourceConfig={config}
          onUpdateInput={this.handleChangeAuto}
          floatingLabelText="Search Book"
		  onNewRequest={ this.onNewRequest.bind(this) }
          fullWidth={true}
        />
		
	</div>
	<center>
    <RaisedButton label="Find Book" primary={true} style={style} onClick={this.handleClick}/>	
		</center>	
        
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