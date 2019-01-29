import React, {Component} from 'react';
import SearchPage from './SearchPage';
//import {Helmet} from 'react-helmet';
//import HomePage from './HomePage'; didn't work
//class Search extends Component {
  //It didn't even come close
  //
//Why not React.Component

class App extends Component {
    //Need to make a home Page
    render() {
        return (
             <div>
                 <h1 align = "center">Geek Text</h1>
                 
                     <style>{'body { background-color: light-blue;}'}</style>
                <SearchPage></SearchPage>
             </div>
        );
    }
}

export default App;