import React, {Component} from 'react';
import SearchPage from './SearchPage';

class App extends Component {
    render() {
        return (
             <div>
                <SearchPage></SearchPage>
                <ShoppingCartIcon></ShoppingCartIcon>
             </div>
        );
    }
}

export default App;
