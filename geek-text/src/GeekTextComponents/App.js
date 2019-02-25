import React, {Component} from 'react';
import Header from './Header'
import LoginScreen from "./LoginScreen";
import RegistrationScreen from './RegistrationScreen';
import ShoppingCartPage from "./ShoppingCartPage";
import {Route, HashRouter} from "react-router-dom";
import AuthorPage from './AuthorPage';
import SearchArea from './SearchArea';

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
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
