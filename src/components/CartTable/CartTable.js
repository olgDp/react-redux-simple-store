import React from "react";
import { connect } from "react-redux";
import {
  bookAddedToCart,
  bookRemovedFromCart,
  bookDeletedFromCart
} from "../../actions";
import "./CartTable.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlusCircle, faMinusCircle, faTrash);

const CartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
  const renderRow = (item, idx) => {
    const { id, title, count, total } = item;

    return (
      <tr key={`${id}`}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>${total}</td>
        <td>
          <button className="btn btn-success" onClick={() => onIncrease(id)}>
            <FontAwesomeIcon icon="plus-circle" />
          </button>
          <button className="btn btn-warning" onClick={() => onDecrease(id)}>
            <FontAwesomeIcon icon="minus-circle" />
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(id)}>
            <FontAwesomeIcon icon="trash" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="CartTable">
      <h2 className="mt-5 mb-4">Your order</h2>

      <table className="table table-hover">
        <thead>
          <tr className="table-dark">
            <th scope="row">#</th>
            <td>Item</td>
            <td>Count</td>
            <td>Price</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>{items.map(renderRow)}</tbody>
      </table>

      <div className="total">
        <strong>Total: ${total}</strong>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cartItems, totalOrder }) => {
  return {
    items: cartItems,
    total: totalOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrease: id => dispatch(bookAddedToCart(id)),
    onDecrease: id => dispatch(bookRemovedFromCart(id)),
    onDelete: id => dispatch(bookDeletedFromCart(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartTable);
