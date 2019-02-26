import React from "react";
import "./BookListItem.css";

const BookListItem = ({ book, onAddToCart }) => {
  const { title, author, price, coverImage } = book;

  return (
    <div className="BookListItem">
      <div className="book-cover">
        <img src={coverImage} width="200" alt="book" />
      </div>
      <div className="book-details">
        <h3 href="#" className="book-title">
          {title}
        </h3>
        <div className="book-author text-muted">{author}</div>
        <div className="book-price">${price}</div>
        <button className="btn btn-primary" onClick={onAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default BookListItem;
