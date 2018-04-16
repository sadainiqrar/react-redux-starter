
import axios from 'axios'
class bookApi {

 
  static getAllBooks(data) {
	  console.log(data);
	  let config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};
	return axios.get("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=MIDoomTSw6xPfQONYXtDWw&q=" + data + "&search[field]=title",config)
    .then(response => {
		let parseString = require('xml2js').parseString;
		let books = response.data;
		parseString(response.data, function (err, result) {
			console.log(result);
			books = result.GoodreadsResponse.search;
		});
		
		
      return books;
		
		
		
		}).catch(error => {
      return error;
    });
  }

  
}

export default bookApi;