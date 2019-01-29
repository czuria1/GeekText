import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./GeekTextComponents/App";
import * as serviceWorker from './serviceWorker';

const element =<h1>Geek Text</h1>;
ReactDOM.render(element, document.getElementById('root'));
//React.createElement
ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
