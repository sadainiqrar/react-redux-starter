
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
	return axios.get("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=MIDoomTSw6xPfQONYXtDWw&q=" + data + "&search[field]=title",
	
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

  
}

export default bookApi;