import React, { Component } from "react";
import BookListItem from "../BookListItem";
import { connect } from "react-redux";
import "./BookList.css";
import { withBookstoreService } from "../HOC";
import { fetchBooks, bookAddedToCart } from "../../actions";
import { compose } from "../../utils";
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";

const BookList = ({ books, onAddToCart }) => {
  return (
    <ul className="BookList">
      {books.map(book => {
        return (
          <li key={book.id}>
            <BookListItem
              book={book}
              onAddToCart={() => onAddToCart(book.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();

    // const {
    //   bookstoreService,
    //   booksLoaded,
    //   booksRequested,
    //   booksError
    // } = this.props;

    // set data to initial state
    // booksRequested();

    // get data and set it to the store
    // bookstoreService
    //   .getBooks()
    //   .then(data => booksLoaded(data))
    //   .catch(error => booksError(error));
  }

  render() {
    const { books, loading, error, onAddToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddToCart={onAddToCart} />;
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return {
    books,
    loading,
    error
  };
};

// const mapDispatchToProps = {
//   booksLoaded,
//   booksRequested,
//   booksError
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;

  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddToCart: id => dispatch(bookAddedToCart(id))
  };
};

export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookListContainer);
