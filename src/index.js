import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./components/App";
import ErrorBoundry from "./components/ErrorBoundry";
import BookstoreService from "./services/BookstoreService";
import { BookstoreServiceProvider } from "./components/BookstoreServiceContext";

import store from "./store";

const bookstoreService = new BookstoreService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BookstoreServiceProvider value={bookstoreService}>
        <Router>
          <Route render={({ location }) => <App location={location} />} />
        </Router>
      </BookstoreServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
