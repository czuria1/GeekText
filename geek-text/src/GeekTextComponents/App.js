import React, {Component} from 'react';
import Header from './Header'
import LoginScreen from "./LoginScreen";
import RegistrationScreen from './RegistrationScreen';
import ShoppingCartPage from "./ShoppingCartPage";
import {Route, HashRouter} from "react-router-dom";
import AuthorPage from './AuthorPage';
import SearchArea from './SearchArea';
import BookList from './BookList';

class App extends Component {
    render() {

        document.title = "Geek Text";

        return (
            <HashRouter>
                <div>
                    <Header></Header>

                    <div>
                        <Route path="/search" component={SearchArea}/>
                        <Route path="/login" component={LoginScreen}/>
                        <Route path="/shoppingCart" component={ShoppingCartPage}/>
                        <Route path="/registration" component={RegistrationScreen}/>
                        <Route path="/authorPage/:author" component={AuthorPage}/>
                        <Route path="/bookList/:term" component={BookList}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
