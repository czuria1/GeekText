import React, {Component} from 'react';
import Header from './Header'
import LoginScreen from "./ProfileManagement/LoginScreen";
import RegistrationScreen from './ProfileManagement/RegistrationScreen';
import ShoppingCartPage from "./ShoppingCartPage";
import {Route, HashRouter} from "react-router-dom";
import AuthorPage from './Display Book Info Components/AuthorPage';
import ProfileSettings from './ProfileManagement/ProfileSettings';
import BookList from './Display Book Info Components/BookList';
import SearchArea from './SearchArea';
import LoginSettings from './ProfileManagement/LoginSettings';
import AddressSettings from './ProfileManagement/AddressSettings';
import PaymentSettings from './ProfileManagement/PaymentSettings';
import BookDetails from './Display Book Info Components/BookDetails';
import Reviews from './Review';

class App extends Component {

    constructor (props) {
        super (props);
        this.state = {
            currentUser: '',
            isUserLoggedIn: false,
            userID: ''
        }

        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);

        document.title = "Geek Text Home";
    }

    setCurrentUser(newUser, userID, loggedIn) {
        this.setState({
            currentUser: newUser,
            userID: userID,
            isUserLoggedIn: loggedIn
        });
        
    }

    logoutUser(oldUser, loggedIn) {
        this.setState({
            currentUser: oldUser,
            isUserLoggedIn: loggedIn
        });

    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Header 
                        currentUser={this.state.currentUser}
                        isUserLoggedIn={this.state.isUserLoggedIn}
                        logoutUser={this.logoutUser}></Header>

                    <div>
                      <div id="route-container">
                        <Route path="/search" component={SearchArea}/>
                        <Route path="/login" render={(props) => <LoginScreen {...props}
                                                                            username={this.state.currentUser}
                                                                            isLoggedIn={this.state.isUserLoggedIn}
                                                                            userID={this.state.userID}
                                                                            setCurrentUser={this.setCurrentUser}/>}/>
                        <Route path="/profilesettings" render={(props) => <ProfileSettings {...props}
                                                                            currentUser={this.state.currentUser}/>}/>
                        <Route path="/shoppingCart" component={ShoppingCartPage}/>
                        <Route path="/registration" component={RegistrationScreen}/>
                        <Route path="/authorPage/:author" component={AuthorPage}/>
                        <Route path="/bookList/:term" component={BookList}/>
                        <Route path="/loginSettings" component={LoginSettings}/>
                        <Route path="/addressSettings" component={AddressSettings}/>
                        <Route path="/paymentSettings" component={PaymentSettings}/>
                        <Route path="/bookDetails" render={(props) => <BookDetails {...props} 
                                                                            currentUser={this.state.currentUser}
                                                                            userID={this.state.userID}/>}/>
                        <Route path="/reviews" component={Reviews}></Route>
                     </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
