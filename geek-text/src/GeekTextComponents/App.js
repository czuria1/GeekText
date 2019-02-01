import React, {Component} from 'react';
import SearchPage from './SearchPage'
import Header from './Header'
import { BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header></Header>
                    <SearchPage></SearchPage>
                </div>
            </Router>
        );
    }
}

export default App;