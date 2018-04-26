import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import * as actions from '../../redux/actions/bookActions';

function mapStateToProps(state) {
  return {
    books: state.entities.books,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Book extends React.Component {
  constructor(props) {
    super(props);
    const { books, params } = props;
    this.state = {
      bookid: params.id,
      book: books[params.id],
    };
  }

  componentWillMount() {}
  componentWillReceiveProps(nextProps) {
    if (nextProps.books !== this.props.books) {
      const { params, books } = this.props;
      const { bookid } = params.id;
      const book = books[params];
      this.setState({ bookid, book });
    }
  }

  render() {
    const { book } = this.state;
    if (book) {
      return book.title
        ? <Card>
            <CardMedia>
              <img src={book.image} alt="" />
            </CardMedia>
            <CardTitle title={book.title} subtitle={book.author} />
            <CardText>
              <p>
                Average Rating: {book.averageRating}
              </p>

              <p>
                Rating Count: {book.ratingCount}
              </p>
            </CardText>
          </Card>
        : <p>Book Not Found</p>;
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
