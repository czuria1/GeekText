import React, { Component } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import { Link } from '@material-ui/core';
import SearchBar from './SearchBar';

export default class SearchArea extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            books: [],  //Contains all the book returned by the search
            searchTerm: ''
        };

        //Bind the methods to the component
        this.handleSearch = this.handleSearch.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
    }

    setTextBoxListner()
    {
        var input = document.getElementById("searchText");
        
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                
                document.getElementById("linkToList").click();
            }
        });
    }

    handleSearch(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    searchButtonClicked(e) {
        if (this.state.searchTerm === "")
        {
            alert("Please enter a search term in the textbox");
            e.preventDefault();
        }
    }

    render() {
        return(
            <div id="search-info-container">
                <SearchBar setTextBoxListner={this.setTextBoxListner}
                           handleSearch={this.handleSearch}
                ></SearchBar>
                <Link id="linkToList"
                      component={RouterLink} 
                      to={"/bookList/" + this.state.searchTerm} 
                      variant="title" 
                      onClick={this.searchButtonClicked}
                      style={{ display: 'none'}} 
                      >Search
                </Link>
            </div>
        )
    }
}