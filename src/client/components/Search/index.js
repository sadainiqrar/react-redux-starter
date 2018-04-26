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
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.params.query,
      isLoading: false,
      books: [],
      page: 1,
      totalResults: props.searchResults.totalResults,
      totalPages: props.searchResults.totalPages,
    };
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadBooks({ query: this.state.query, page: 1 });
  }

  handleItemClick(i) {
    this.props.history.push(`/book/${i}`);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults !== this.props.searchResults) {
      const { items, totalResults, totalPages } = nextProps.searchResults;
      const entityBooks = nextProps.books;
      const books = items.map(book => entityBooks[book]);
      this.setState({ totalResults, totalPages, books });
    }

    this.setState({ isLoading: false });
  }
  handleLoadMore() {
    const { page, query, totalPages } = this.state;
    if (page <= totalPages) {
      this.setState({ isLoading: true });
      this.props.actions.PaginateBooks({ query, page: page + 1 });
      this.setState({ page: page + 1 });
    }
  }

  renderWaypoint() {
    if (!this.state.isLoading) {
      return <Waypoint onEnter={this.handleLoadMore} />;
    }
    return <p />;
  }

  render() {
    const { books, totalResults, page, totalPages } = this.state;
    if (books) {
      if (books.length > 0) {
        if (totalResults > 0) {
          return (
            <div>
              <List>
                <Subheader>{`${totalResults} Books Found`}</Subheader>
                {books.map((book, index) =>
                  <ListItem
                    onClick={this.handleItemClick.bind(this, book.id)}
                    key={index}
                    leftAvatar={<Avatar src={book.image} />}
                    primaryText={book.author}
                    secondaryText={
                      <p>
                        <span>
                          {book.title}
                        </span>
                      </p>
                    }
                    secondaryTextLines={2}
                  />
                )}
              </List>
              {page <= totalPages
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
      }
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
