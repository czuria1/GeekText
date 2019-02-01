import React, {Component} from 'react';
import SearchPage from './SearchPage';


class App extends Component {
    render() {
        return (
             <div class = "topnav">
             <a class = "active" href = "Homepage">Home</a>
             
                   <h1 align = "center">Geek Text</h1>
                 
                 <div align ="center">
                <SearchPage></SearchPage>
                </div>
               
             </div>
        );
    }
}

export default App;
