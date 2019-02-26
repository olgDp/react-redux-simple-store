import { createStore } from "redux";
import reducer from "./reducers";
// import reducer from "./reducers/temp";

const store = createStore(reducer);

export default store;
