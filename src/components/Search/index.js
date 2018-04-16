import React from 'react';
import styles from './styles.scss';



class Search extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    searchString: ""
	}
  }
	
  componentWillMount() {
	  
    let query = this.props.params.query;
	
    this.setState({searchString: query});
	 
  }
	
	

  render() {
    return (
      <div>
        <h2>{this.state.searchString}</h2>
      </div>
    )
  }
}

export default Search;
