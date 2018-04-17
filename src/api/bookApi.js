
import axios from 'axios'
class bookApi {

	static CancelReq()
	{
		console.log('canceled called')
		return this.source.cancel('Canceled previous Request');
	}
  static getAllBooks(data) {
	  console.log(data);
		this.source = axios.CancelToken.source();
		this.source.cancel('Canceled previous Request');
		
		this.source = axios.CancelToken.source();
	return axios.get("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=MIDoomTSw6xPfQONYXtDWw&q=" + data.query + "&search[field]=title&page="+data.page,
	
	{ cancelToken: this.source.token }
	)
    .then(response => {
		let parseString = require('xml2js').parseString;
		let books = response.data;
		parseString(response.data, function (err, result) {
			console.log(result);
			books = result.GoodreadsResponse.search;
		});
		
			return books;
		
		
		
		}).catch(error => {
			console.log("Error: ", error)
      return error;
    });
	
  }
  
  static getBook(data) {
	  console.log(data);
		
		this.source = axios.CancelToken.source();
		
		let config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};
	return axios.get("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show.xml?key=MIDoomTSw6xPfQONYXtDWw&id=" + data,
	config
	)
    .then(response => {
		let parseString = require('xml2js').parseString;
		let book = response.data;
		parseString(response.data, function (err, result) {
			book = result.GoodreadsResponse.book[0];
		});
		
			return book;
		
		
		
		}).catch(error => {
			console.log("Error: ", error)
      return error;
    });
	
  }

  
}

export default bookApi;