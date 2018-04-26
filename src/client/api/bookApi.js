import axios from 'axios';
import * as xmlParse from 'xml2js';

class bookApi {
  static getAllBooks(data) {
    let source = axios.CancelToken.source();
    source.cancel('Canceled previous Request');
    source = axios.CancelToken.source();
    return axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=MIDoomTSw6xPfQONYXtDWw&q=
				${data.query}&search[field]=title&page=${data.page}`,
        { cancelToken: source.token }
      )
      .then(response => {
        const parseString = xmlParse.parseString;

        let books = response.data;
        parseString(response.data, (err, result) => {
          books = result.GoodreadsResponse.search;
        });
        books[0].page = data.page;
        return books;
      })
      .catch(error => error);
  }
}

export default bookApi;
