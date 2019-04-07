import React, {Component} from 'react';
import Header from './Header'
import LoginScreen from "./ProfileManagement/LoginScreen";
import RegistrationScreen from './ProfileManagement/RegistrationScreen';
import Cart from "./Cart"
import {Route, HashRouter} from "react-router-dom";
import AuthorPage from './Display Book Info Components/AuthorPage';
import ProfileSettings from './ProfileManagement/ProfileSettings';
<<<<<<< Updated upstream
import BookList from './Display Book Info Components/BookList';
import SearchArea from './Display Book Info Components/SearchArea';
import LoginSettings from './ProfileManagement/LoginSettings';
import AddressSettings from './ProfileManagement/AddressSettings';
import PaymentSettings from './ProfileManagement/PaymentSettings';
import BookDetails from './Display Book Info Components/BookDetails';
import Reviews from './Review';

//import AuthorPage from './AuthorPage';

//import ProfileSettings from './ProfileManagement/ProfileSettings';
=======
import BookList from './BookList';
import SearchArea from './SearchArea';
import HomePage from './HomePage';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

class App extends Component {

    constructor (props) {
        super (props);
        this.state = {
<<<<<<< Updated upstream
            currentUser: '',
            isUserLoggedIn: false,
            userID: ''
=======
            currentUser: 'test',
            isUserLoggedIn: false,
            isOnHomePage: false
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                        logoutUser={this.logoutUser}></Header>

=======
                        logoutUser={this.state.logoutUser}></Header>
                       
>>>>>>> Stashed changes
=======
                        logoutUser={this.state.logoutUser}></Header>
                       
>>>>>>> Stashed changes
=======
                        logoutUser={this.state.logoutUser}></Header>
                       
>>>>>>> Stashed changes
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