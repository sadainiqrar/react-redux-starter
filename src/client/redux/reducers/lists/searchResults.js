import * as types from '../../actions/actionTypes';

export function searchResults(state = {}, action) {
  const { type, payload, intent } = action;
  switch (type) {
    case types.LOAD_BOOKS_SUCCESS: {
      const query = payload[0].query[0];
      const totalResults = payload[0]['total-results'][0];
      const page = payload[0].page;
      const totalPages = Math.floor(totalResults / (20 + (totalResults % 20 === 0 ? 0 : 1)));
      const bookArray =
        totalResults > 0
          ? payload[0].results[0].work.map(book => book.best_book[0].id[0]._)
          : state;
      const items = intent === 'NEW' ? bookArray : [...state.items, ...bookArray];
      const nextState = {
        query,
        items,
        page,
        totalResults,
        totalPages,
      };
      return nextState;
    }
    case types.LOAD_BOOKS:
      return state;
    case types.LOAD_BOOKS_FAILURE:
      return state;
    default:
      return state;
  }
}
