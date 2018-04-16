import React, {PropTypes} from 'react';

import Link from 'react-router/lib/Link';
import styles from './styles.scss';

const BooksList = ({books}) => {
	
	
    this.state = {
      foundBooks: [],
	  total: 0,
	  query: ""
	}	 

	
	
	console.log("BookList Books: ",books);
	if(books.length>0)
	{
		if((books[0]["total-results"][0])>0)
		{
				this.state.total = books[0]["total-results"][0];
				
				
				this.state.foundBooks =  books[0].results[0].work;
				this.state.query = books[0].query[0];
		}
		else
		{
				this.state.total = 0;
				
				this.state.foundBooks = [];
				
				this.state.query = "";
		};
		
		return (
			<ul className="list-group">
				{this.state.foundBooks.map(book => 
				<li className="list-group-item">{book.best_book[0].title[0]}</li>
				)}
				<li className={this.state.total > 3 ? "list-group-item" : "list-group-item hidden"}><Link className={styles.link} to={"/search/" + this.state.query}>
            <strong>{this.state.total - 3}</strong> other Results
          </Link></li>
				
			</ul>
			);
	}
	else
	{
		return(
		<p></p>
	  )
	}
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired
};

export default BooksList;