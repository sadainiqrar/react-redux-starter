import * as types from '../../actions/actionTypes';

export function books(state = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case types.LOAD_BOOKS_SUCCESS: {
      const total = payload[0]['total-results'][0];
      const newState = state;
      if (total > 0) {
        const booksArray = payload[0].results[0].work;
        booksArray.forEach(book => {
          const bestBook = book.best_book[0];
          newState[`${bestBook.id[0]._}`] = {
            id: bestBook.id[0]._,
            title: bestBook.title[0],
            author: bestBook.author[0].name[0],
            image: bestBook.image_url[0],
            averageRating: book.average_rating[0],
            ratingCount: book.ratings_count[0]._,
          };
        });
      }
      return newState;
    }
    case types.LOAD_BOOKS:
      return state;
    case types.LOAD_BOOKS_FAILURE:
      return state;
    default:
      return state;
  }
}
