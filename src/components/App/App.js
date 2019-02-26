import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { HomePage, CartPage } from "../pages";
import Header from "../../Header";

const App = ({ location, cartItems, totalOrder }) => {
  const totalItems = cartItems.length;

  return (
    <main className="container">
      <Header
        cartItems={totalItems}
        totalOrder={totalOrder}
        location={location}
      />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/cart" component={CartPage} />
      </Switch>
    </main>
  );
};

const mapStateToProps = ({ totalOrder, cartItems }) => {
  return {
    totalOrder,
    cartItems
  };
};

export default connect(mapStateToProps)(App);
