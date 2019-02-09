import React, {Component} from 'react';
import SearchPage from './SearchPage'
import Header from './Header'
import LoginScreen from "./LoginScreen";
import ShoppingCartPage from "./ShoppingCartPage";
import {Route, HashRouter} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Header></Header>

                    <div>
                        <Route path="/search" component={SearchPage}/>
                        <Route path="/login" component={LoginScreen}/>
                        <Route path="/shoppingCart" component={ShoppingCartPage}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
