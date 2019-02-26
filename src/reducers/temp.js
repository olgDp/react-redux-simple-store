const initialState = {
  bookList: {
    books: [],
    loading: true,
    error: null
  },
  shoppingCart: {
    cartItems: [],
    totalOrder: 0
  }
};

const updateBookList = (state, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_REQUEST":
      return {
        books: [],
        loading: true,
        error: null
      };

    case "FETCH_BOOKS_SUCCES":
      return {
        books: action.payload,
        loading: false,
        error: null
      };

    case "FETCH_BOOKS_FAILURE":
      return {
        books: [],
        loading: false,
        error: action.payload
      };
  }
};

const updateShoppingCart = (state, action) => {
  switch (action.type) {
    case "BOOK_ADDED_TO_CART":
      const bookId = action.payload;

      let book = state.bookList.books.find(({ id }) => id === bookId);
      const bookInTheCart = state.shoppingCart.cartItems.find(
        ({ id }) => id === bookId
      );

      let newItem, updateItems;

      if (!bookInTheCart) {
        newItem = {
          id: book.id,
          title: book.title,
          count: 1,
          total: book.price
        };

        return {
          totalOrder: 0,
          cartItems: [...state.shoppingCart.cartItems, newItem]
        };
      } else {
        newItem = {
          ...bookInTheCart,
          count: bookInTheCart.count + 1,
          total: bookInTheCart.total + book.price
        };

        updateItems = state.shoppingCart.cartItems.map(item => {
          if (item.id === bookId) {
            return newItem;
          } else {
            return item;
          }
        });

        return {
          totalOrder: 0,
          cartItems: updateItems
        };
      }

    case "BOOK_REMOVED_FROM_CART":
      const removeId = action.payload;
      book = state.bookList.books.find(({ id }) => id === removeId);
      const removedBook = state.shoppingCart.cartItems.find(
        ({ id }) => id === removeId
      );

      newItem = {
        ...removedBook,
        count: removedBook.count - 1,
        total: removedBook.total - book.price
      };

      updateItems = state.shoppingCart.cartItems
        .map(item => {
          if (item.id === removeId) {
            return newItem;
          } else {
            return item;
          }
        })
        .filter(({ count }) => count > 0);

      return {
        totalOrder: 0,
        cartItems: updateItems
      };

    case "BOOK_DELETED_FROM_CART":
      const deleteId = action.payload;
      updateItems = state.shoppingCart.cartItems.filter(
        ({ id }) => id !== deleteId
      );

      return {
        totalOrder: 0,
        cartItems: updateItems
      };

    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case "FETCH_BOOKS_REQUEST":
    case "FETCH_BOOKS_SUCCESS":
    case "FETCH_BOOKS_FAILURE":
      return {
        ...state,
        bookList: updateBookList(state, action)
      };

    case "BOOK_ADDED_TO_CART":
    case "BOOK_REMOVED_FROM_CART":
    case "BOOK_DELETED_FROM_CART":
      return {
        ...state,
        shoppingCart: updateShoppingCart(state, action)
      };

    default:
      return state;
  }
};

export default reducer;
