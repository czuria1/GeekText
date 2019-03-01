import React, {Component} from 'react';
import SearchPage from './SearchPage'
import Header from './Header'
import LoginScreen from "./ProfileManagement/LoginScreen";
import RegistrationScreen from './ProfileManagement/RegistrationScreen';
import ShoppingCartPage from "./ShoppingCartPage";
import {Route, HashRouter} from "react-router-dom";
import AuthorPage from './AuthorPage';
import NewUser from './ProfileManagement/NewUser';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Header></Header>

                    <div>
                        <Route path="/search" component={SearchPage}/>
                        <Route path="/login" component={LoginScreen}/>
                        <Route path="/login/welcome" component={NewUser}/>
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
