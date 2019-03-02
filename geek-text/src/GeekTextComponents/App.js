import React, {Component} from 'react';
import Header from './Header'
import LoginScreen from "./ProfileManagement/LoginScreen";
import RegistrationScreen from './ProfileManagement/RegistrationScreen';
import ShoppingCartPage from "./ShoppingCartPage";
import {Route, HashRouter} from "react-router-dom";
import AuthorPage from './AuthorPage';
import BookList from './BookList';
import SearchArea from './SearchArea';

class App extends Component {

    constructor (props) {
        super (props);
        this.state = {
            currentUser: '',
            isUserLoggedIn: false
        }

        this.setCurrentUser = this.setCurrentUser.bind(this);
        
        document.title = "Geek Text";
    }

    setCurrentUser(newUser) {
        this.setState({
            isUserLoggedIn: true,
            currentUser: newUser
        });
    }

    render() {
      
        return (
            <HashRouter>
                <div>
                    <Header 
                        currentUser={this.state.currentUser}
                        isUserLoggedIn={this.state.isUserLoggedIn}
                        setCurrentUser={this.setCurrentUser.bind(this)}>
                    </Header>
                    <div>
                      <div id="route-container">
                        <Route path="/search" component={SearchArea}/>
                        <Route path="/login" render={(props) => <LoginScreen {...props}
                                                                            isLoggedIn={this.state.isUserLoggedIn}/>}/>
                        <Route path="/shoppingCart" component={ShoppingCartPage}/>
                        <Route path="/registration" component={RegistrationScreen}/>
                        <Route path="/authorPage/:author" component={AuthorPage}/>
                        <Route path="/bookList/:term" component={BookList}/>
                     </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
