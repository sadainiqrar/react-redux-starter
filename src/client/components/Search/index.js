import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Waypoint from 'react-waypoint';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import * as actions from '../../redux/actions/bookActions';

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};
function mapStateToProps(state, ownProps) {
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
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      searchString: '',
      books: [],
      apiLoad: true,
      displayBooks: [],
      currentBooks: [],
      page: 1,
      total: 0,
      totalPage: 0,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
  }

  componentDidMount() {
    const { params, actions } = this.props;
    const { page } = this.state;
    const query = params.query;

    actions.loadBooks({ query, page });
  }

  handleItemClick(i) {
    this.props.history.push(`/book/${i}`);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchString: nextProps.params.query });

    if (nextProps.books !== this.props.books) {
      if (nextProps.books[0]) {
        if (nextProps.books.length > 0) {
          if (nextProps.books[0]['total-results'][0] > 0) {
            const temp = nextProps.books[0].results[0].work
              .filter((i, index) => index < 10)
              .map(book => book);
            this.setState({ displayBooks: this.state.displayBooks.concat(temp) });

            this.setState({ currentBooks: nextProps.books[0].results[0].work });
            this.setState({ books: this.state.books.concat(nextProps.books[0].results[0].work) });

            this.setState({ total: nextProps.books[0]['total-results'][0] });

            const tPages =
              nextProps.books[0]['total-results'][0] % 20 === 0
                ? nextProps.books[0]['total-results'][0] / 20
                : Math.floor(nextProps.books[0]['total-results'][0] / 20 + 1);

            this.setState({ totalPage: tPages });
            this.setState({ onLoading: false });

            this.setState({ apiLoad: false });
          } else {
            this.setState({ books: [] });

            this.setState({ displayBooks: [] });
            this.setState({ onLoading: false });
          }
        } else {
          this.setState({ onLoading: false });
        }
      } else {
        this.setState({ books: [] });

        this.setState({ displayBooks: [] });
        this.setState({ onLoading: false });
      }
    } else {
      this.setState({ onLoading: false });
    }
  }
  handleLoadMore() {
    if (!this.state.apiLoad) {
      this.setState({ onLoading: true });
      const temp = this.state.currentBooks
        .filter((i, index) => index >= 10 && index < 20)
        .map(book => book);
      this.setState({ displayBooks: this.state.displayBooks.concat(temp) });
      this.setState({ onLoading: false });

      this.setState({ apiLoad: true });
    } else if (this.state.page < this.state.totalPage) {
      this.setState({ onLoading: true });
      this.props.actions.loadBooks({ query: this.state.searchString, page: this.state.page + 1 });
      this.setState({ page: this.state.page + 1 });
    }
  }

  renderWaypoint() {
    if (!this.state.isLoading) {
      return <Waypoint onEnter={this.handleLoadMore} />;
    }
  }

  render() {
    const { displayBooks, total, page, totalPage } = this.state;
    if (displayBooks.length > 0) {
      if (total > 0) {
        return (
          <div>
            <List>
              <Subheader>{`${total} Books Found`}</Subheader>
              {displayBooks.map((book, index) =>
                <ListItem
                  onClick={this.handleItemClick.bind(this, book.best_book[0].id[0]._)}
                  key={index}
                  leftAvatar={<Avatar src={book.best_book[0].small_image_url[0]} />}
                  primaryText={book.best_book[0].author[0].name[0]}
                  secondaryText={
                    <p>
                      <span>
                        {book.best_book[0].title[0]}
                      </span>
                    </p>
                  }
                  secondaryTextLines={2}
                />
              )}
            </List>
            {page < totalPage
              ? <div className="infinite-scroll-example__waypoint">
                  {this.renderWaypoint()}
                  <div style={style.container}>
                    <center>
                      <RefreshIndicator
                        size={40}
                        left={0}
                        top={20}
                        status="loading"
                        style={style.refresh}
                      />
                    </center>
                  </div>
                </div>
              : <p />}
          </div>
        );
      }

      return (
        <div>
          <center>
            <h1>No Results found</h1>
          </center>
        </div>
      );
    }

    return (
      <div>
        <center>
          <h1>No Results found</h1>
        </center>
      </div>
    );
  }
}
