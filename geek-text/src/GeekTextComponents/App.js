import React, {Component} from 'react';

import SearchPage from './SearchPage'
import Header from './Header'
import { BrowserRouter as Router} from 'react-router-dom'


class App extends Component {
    //Need to make a home Page
    render() {
        return (


            <Router>
                <div>
                    <Header></Header>
                    <div align ="center">
                        <SearchPage></SearchPage>
                    </div>
                </div>
            </Router>
            

        );
    }
}

export default App;
