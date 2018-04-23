import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../redux/actions/bookActions';

const style = {
  margin: 12,
};
function mapStateToProps(state) {
  if (state.books) {
    return {
      books: state.books,
    };
  }

  return {
    books: [],
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
      isLoading: false,
      books: [],
      booksData: [],
      value: '',
      total: 0,
      query: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeAuto = this.handleChangeAuto.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.books !== this.props.books) {
      if (nextProps.books[0]) {
        if (nextProps.books.length > 0) {
          if (nextProps.books[0]['total-results'][0] > 0) {
            this.setState({ value: nextProps.books[0].query[0] });
            this.setState({ total: nextProps.books[0]['total-results'][0] });
            this.setState({ books: nextProps.books[0].results[0].work });

            this.setState({ query: nextProps.books[0].query[0] });

            const bookData = nextProps.books[0].results[0].work
              .filter((i, index) => index < 5)
              .map(book => ({
                name: book.best_book[0].title[0],
                code: book.best_book[0].id[0]._,
                q: '',
              }));
            if (nextProps.books[0]['total-results'][0] > 5) {
              bookData.push({
                name: `${nextProps.books[0]['total-results'][0] - 5} Other Results`,
                code: 'search',
                q: this.state.query,
              });
            }

            this.setState({ booksData: bookData });
          } else {
            this.setState({ books: [] });
          }
        }
      } else {
        this.setState({ books: [] });
      }
    }
  }

  handleChangeAuto(value) {
    this.props.actions.loadBooks({ query: value, page: 1 });
    this.setState({ value });
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
    const config = { text: 'name', value: 'code', option: 'q' };
    const { booksData } = this.state;

    return (
      <section>
        <div>
          <AutoComplete
            hintText="Search Book"
            filter={AutoComplete.noFilter}
            dataSource={booksData}
            dataSourceConfig={config}
            onUpdateInput={this.handleChangeAuto}
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
