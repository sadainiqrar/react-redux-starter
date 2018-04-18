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

import AutoComplete from 'material-ui/AutoComplete';



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
    this.handleChangeAuto = this.handleChangeAuto.bind(this);
	
	this.onNewRequest = this.onNewRequest.bind(this);
  }
  
  componentWillMount() {
	  
	 
	  
  }
 

  handleChange(event) {
	
			//this.props.actions.CancelRequest()
    this.setState({isLoading: true});
	console.log(event);
    this.setState({value: event.target.value})
	console.log("Props: ", this.props)
			this.props.actions.loadBooks({"query": event.target.value, "page": 1}).then(()=>{
				
				
				this.setState({isLoading: false});
			})
			
	
	
	
	
	
    //this.setState({isLoading: false});
	  
	
    event.preventDefault();
  }

  handleChangeAuto(event) {
	
			//this.props.actions.CancelRequest()
   this.setState({isLoading: true});
	console.log(event);
   this.setState({value: event})
	console.log("Props: ", this.props)
			this.props.actions.loadBooks({"query": event, "page": 1}).then(()=>{
				
				
				this.setState({isLoading: false});
			})
			
	
	
	
	
	
    //this.setState({isLoading: false});
	  
	
   // event.preventDefault();
  }
  onNewRequest(chosenRequest, index) {
			console.log('onNewRequest', chosenRequest, index);
	if(chosenRequest.code === "search")
	{
		
		this.props.history.push('/search/' + chosenRequest.q);
	}
	else
	{
		
		this.props.history.push('/book/' + chosenRequest.code);
	}
    
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
	   let bookData = [];
	   let query = "";
		let total = 0;
	  if(this.props.books[0])
	  {
		  if(this.props.books.length>0){
				if((this.props.books[0]["total-results"][0])>0)
				{
				
					total = this.props.books[0]["total-results"][0];
					books =  this.props.books[0].results[0].work;
					
				     query = this.props.books[0].query[0];
					console.log("Found Books", books)
					bookData = books.filter((i, index) => (index < 5)).map(book => 
											{
												return {name: book.best_book[0].title[0],code: book.best_book[0].id[0]._,q:""};
											})
					if(total>5)
					{
						bookData.push({name:((total - 5) + " Other Results"),code:"search",q: query});
					}
											
					
				}
				else
				{
				
					books = [];
				
				};
		  }
		  
	  }
	  else{
			books = []
	  }
	
	
		
		let config = { text: 'name', value: 'code',option:'q'}
	console.log('DataSource: ', bookData);
    return (
    <section>
	<div>
	</div>
			<AutoComplete
          hintText="Search Book"
		  filter = { AutoComplete.noFilter }
          dataSource={bookData}
		  dataSourceConfig={config}
          onUpdateInput={this.handleChangeAuto}
          floatingLabelText="Search Book"
		  onNewRequest={ this.onNewRequest }
          fullWidth={true}
        />
			
			
        
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