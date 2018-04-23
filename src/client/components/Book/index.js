import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
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
  if (state.book) {
    return {
      book: state.book,
    };
  }

  return {
    book: {},
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookid: '',
      book: {},
    };
  }

  componentWillMount() {
    const { props } = this;
    const query = props.params.id;

    props.actions.loadBook(query);
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (nextProps.book !== props.book) {
      this.setState({ bookid: nextProps.params.id });

      this.setState({ book: nextProps.book });
    }
  }

  render() {
    const { book } = this.state;
    if (this.state.book.title) {
      return (
        <Card>
          <CardMedia>
            <img src={book.image_url[0]} alt="" />
          </CardMedia>
          <CardTitle title={book.title[0]} subtitle={book.authors[0].author[0].name[0]} />
          <CardText>
            <p>
              Average Rating: {book.average_rating[0]}
            </p>

            <p>
              Rating Count: {book.ratings_count[0]}
            </p>
          </CardText>
        </Card>
      );
    }

    return (
      <div style={style.container}>
        <center>
          <RefreshIndicator size={40} left={0} top={20} status="loading" style={style.refresh} />
        </center>
      </div>
    );
  }
}
