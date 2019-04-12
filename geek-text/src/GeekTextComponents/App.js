import React, {Component} from 'react';
import Header from './Header'
import LoginScreen from "./ProfileManagement/LoginScreen";
import RegistrationScreen from './ProfileManagement/RegistrationScreen';
import Cart from './Cart';
import {Route, HashRouter} from "react-router-dom";
import AuthorPage from './Display Book Info Components/AuthorPage';
import ProfileSettings from './ProfileManagement/ProfileSettings';
import BookList from './Display Book Info Components/BookList';
import SearchArea from './Display Book Info Components/SearchArea';
import LoginSettings from './ProfileManagement/LoginSettings';
import AddressSettings from './ProfileManagement/AddressSettings';
import PaymentSettings from './ProfileManagement/PaymentSettings';
import BookDetails from './Display Book Info Components/BookDetails';
import Reviews from './Review';
import HomePage from './HomePage';

//import AuthorPage from './AuthorPage';

//import ProfileSettings from './ProfileManagement/ProfileSettings';

class App extends Component {

    constructor (props) {
        super (props);
        this.state = {
            currentUser: '',
            isUserLoggedIn: false,
            userID: '',
            currentUserHomeAddressId: '' 
        }

        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);

        document.title = "Geek Text Home";
    }

    setCurrentUser(newUser, userID, loggedIn, home_address_id) {
        this.setState({
            currentUser: newUser,
            userID: userID,
            isUserLoggedIn: loggedIn, 
            currentUserHomeAddressId: home_address_id
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
                        <Route path= "/homePage" component={HomePage}/>
                        <Route path="/search" component={SearchArea}/>
                        <Route path="/login" render={(props) => <LoginScreen {...props}
                                                                            username={this.state.currentUser}
                                                                            isLoggedIn={this.state.isUserLoggedIn}
                                                                            userID={this.state.userID}
                                                                            setCurrentUser={this.setCurrentUser}/>}/>
                        <Route path="/profilesettings" render={(props) => <ProfileSettings {...props}
                                                                            currentUser={this.state.currentUser}/>}/>
                        <Route path="/shoppingCart" component={Cart}/>
                        <Route path="/registration" component={RegistrationScreen}/>
                        <Route path="/authorPage/:author" component={AuthorPage}/>
                        <Route path="/bookList/:term" component={BookList}/>
                        <Route path="/loginSettings" render={(props) => <LoginSettings {...props}
                                                                            username={this.state.currentUser}
                                                                            currentUser={this.state.currentUser}/>}/>
                        <Route path="/addressSettings" render={(props) => <AddressSettings {...props} 
                                                                            currentUserId={this.state.userID}/>}/>
                        <Route path="/paymentSettings" render={(props) => <PaymentSettings {...props} 
                                                                            currentUserId={this.state.userID}/>}/>
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