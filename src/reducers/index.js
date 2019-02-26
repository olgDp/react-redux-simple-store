const initialState = {
  books: [],
  cartItems: [],
  totalOrder: 0,
  loading: true,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_REQUEST":
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };

    case "FETCH_BOOKS_SUCCES":
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case "FETCH_BOOKS_FAILURE":
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };

    case "BOOK_ADDED_TO_CART":
      const bookId = action.payload;

      let book = state.books.find(({ id }) => id === bookId);
      const bookInTheCart = state.cartItems.find(({ id }) => id === bookId);

      let newItem, updateItems;

      if (!bookInTheCart) {
        newItem = {
          id: book.id,
          title: book.title,
          count: 1,
          total: book.price
        };

        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
          totalOrder: state.totalOrder + book.price
        };
      } else {
        newItem = {
          ...bookInTheCart,
          count: bookInTheCart.count + 1,
          total: bookInTheCart.total + book.price
        };

        updateItems = state.cartItems.map(item => {
          if (item.id === bookId) {
            return newItem;
          } else {
            return item;
          }
        });

        return {
          ...state,
          cartItems: updateItems,
          totalOrder: state.totalOrder + book.price
        };
      }

    case "BOOK_REMOVED_FROM_CART":
      const removeId = action.payload;

      book = state.books.find(({ id }) => id === removeId);
      const removedBook = state.cartItems.find(({ id }) => id === removeId);

      newItem = {
        ...removedBook,
        count: removedBook.count - 1,
        total: removedBook.total - book.price,
        totalOrder: state.totalOrder - book.price
      };

      updateItems = state.cartItems
        .map(item => {
          if (item.id === removeId) {
            return newItem;
          } else {
            return item;
          }
        })
        .filter(({ count }) => count > 0);

      return {
        ...state,
        cartItems: updateItems,
        totalOrder: state.totalOrder - book.price
      };

    case "BOOK_DELETED_FROM_CART":
      const deleteId = action.payload;

      updateItems = state.cartItems.filter(({ id }) => id !== deleteId);

      const totalOrder = updateItems.reduce((current, nextItem) => {
        return current + nextItem.total;
      }, 0);

      return {
        ...state,
        cartItems: updateItems,
        totalOrder
      };

    default:
      return state;
  }
};

export default reducer;
