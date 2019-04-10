import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./GeekTextComponents/App";
import Review from "./GeekTextComponents/Review";
import * as serviceWorker from "./serviceWorker";
import shoppingCartReducer from './GeekTextComponents/shoppingcartcomponents/reducer/shoppingCartReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(shoppingCartReducer);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
