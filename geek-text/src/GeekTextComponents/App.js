import React, {Component} from 'react';
import SearchPage from './SearchPage';
import ProfileLoginButton from './ProfileLoginButton';


class App extends Component {
    render() {
        return (
             <div>
                <SearchPage></SearchPage>

                <ProfileLoginButton></ProfileLoginButton>
             </div>
        );
    }
}

export default App;