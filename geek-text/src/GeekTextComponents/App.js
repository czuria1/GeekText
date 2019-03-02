import React, {Component} from 'react';
import SearchPage from './SearchPage'
import Header from './Header'
import LoginScreen from "./ProfileManagement/LoginScreen";
import RegistrationScreen from './ProfileManagement/RegistrationScreen';
import ShoppingCartPage from "./ShoppingCartPage";
import {Route, HashRouter} from "react-router-dom";
import AuthorPage from './AuthorPage';
import ProfileSettings from './ProfileManagement/ProfileSettings';

const Login = () => (
    <Route render={props => (
        <LoginScreen {...props}></LoginScreen>
    )}/>
)

class App extends Component {

    constructor (props) {
        super (props);
        this.state = {
            currentUser: 'test',
            isUserLoggedIn: false
        }

        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    setCurrentUser(newUser, loggedIn) {
        this.setState({
            currentUser: newUser,
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
                        logoutUser={this.state.logoutUser}></Header>

                    <ProfileSettings
                        currentUser={this.state.currentUser}></ProfileSettings>

                    <div>
                        <Route path="/search" component={SearchPage}/>
                        <Route path="/login" render={(props) => <LoginScreen {...props}
                                                                            username={this.state.currentUser}
                                                                            isLoggedIn={this.state.isUserLoggedIn}
                                                                            setCurrentUser={this.setCurrentUser}/>}/>
                        <Route path="/profilesettings" render={(props) => <ProfileSettings {...props}
                                                                            currentUser={this.state.currentUser}/>}/>
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
