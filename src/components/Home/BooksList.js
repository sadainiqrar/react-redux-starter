import React, {PropTypes} from 'react';


const BooksList = ({books}) => {
  return (/*
      <ul className="list-group">
        {books.map(book => 
           <li className="list-group-item">{book}</li>
        )}
      </ul>*/
	  <p>{JSON.stringify(books)}</p>
  );
};
/*
BooksList.propTypes = {
  books: PropTypes.isRequired
};
*/
export default BooksList;