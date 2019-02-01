import React, {Component} from 'react';
import SearchPage from './SearchPage';
import ShoppingCartIcon from "./ShoppingCartIcon";

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
