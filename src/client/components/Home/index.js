import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import debounce from 'lodash/debounce';
import * as actions from '../../redux/actions/bookActions';

const style = {
  margin: 12,
};
function mapStateToProps(state) {
  return {
    searchResults: state.lists.searchResults,
    books: state.entities.books,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      value: '',
      query: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeAuto = debounce(this.handleChangeAuto.bind(this), 1000);
    this.handleNewRequest = this.handleNewRequest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults !== this.props.searchResults) {
      const { query, items, totalResults } = nextProps.searchResults;
      const books = nextProps.books;
      this.setState({ query });
      if (items.length > 0) {
        const bookData = items.filter((i, index) => index < 5).map(book => ({
          name: books[book].title,
          code: book,
          author: books[book].author,
          image: books[book].image,
        }));
        if (items.length > 5) {
          bookData.push({
            name: `${parseInt(totalResults, 10) - 5} Other Results`,
            code: 'search',
            author: query,
            image: '',
          });
        }
        this.setState({ books: bookData });
      }
    }
  }

  handleChangeAuto(value) {
    if (value.length > 0) {
      this.props.actions.loadBooks({ query: value, page: 1 });
      this.setState({ value });
    }
  }
  handleNewRequest(chosenRequest) {
    if (chosenRequest.code === 'search') {
      this.props.history.push(`/search/${this.state.query}`);
    } else {
      this.props.history.push(`/book/${chosenRequest.code}`);
    }
  }

  handleClick(event) {
    const { value } = this.state;
    const { history } = this.props;

    if (value.length > 0) {
      // history.push('/search/' + value);
      history.push(`/search/${value}`);
    }

    event.preventDefault();
  }

  render() {
    const config = { text: 'name', value: 'code', option: 'author', image: 'image' };
    const { books } = this.state;
    return (
      <section>
        <div>
          <AutoComplete
            hintText="Search Book"
            filter={AutoComplete.noFilter}
            dataSource={books}
            dataSourceConfig={config}
            onUpdateInput={this.handleChangeAuto}
            openOnFocus={true}
            floatingLabelText="Search Book"
            onNewRequest={this.handleNewRequest}
            fullWidth
          />
        </div>
        <center>
          <RaisedButton label="Find Book" primary style={style} onClick={this.handleClick} />
        </center>
      </section>
    );
  }
}
