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
        return books;
      })
      .catch(error => error);
  }

  static getBook(data) {
    const config = {
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
    return axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show.xml?key=MIDoomTSw6xPfQONYXtDWw&id=
          ${data}`,
        config
      )
      .then(response => {
        const parseString = xmlParse.parseString;
        let book = response.data;
        parseString(response.data, (err, result) => {
          book = result.GoodreadsResponse.book[0];
        });

        return book;
      })
      .catch(error => error);
  }
}

export default bookApi;
