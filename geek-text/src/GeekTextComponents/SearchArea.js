import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class SearchArea extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            books: [],  //Contains all the book returned by the search
            searchTerm: ''
        };

        //Bind the methods to the component
        this.handleSearch = this.handleSearch.bind(this);
    }

    setTextBoxListner()
    {
        var input = document.getElementById("searchText");

        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                document.getElementById("searchButton").click();
            }
        });
    }

    handleSearch(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    searchButtonClicked() {
        console.log("searchButtonClicked");
        
    }

    

    render() {
        
        return(
            <div id="search-info-container" align="center">
                <button id="searchButton" 
                        onClick={this.searchButtonClicked}>
                        <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                 to={"/bookList/" + this.state.searchTerm}
                                 >Search</NavLink>
                </button>

                <input onFocus={this.setTextBoxListner} 
                       id="searchText" 
                       type="text" 
                       placeholder = "Author, Title, Genre ... " 
                       onChange={this.handleSearch}/>

                <button id="topSearch">Top Sellers</button>
                
            </div>
        )
    }
}

export default SearchArea;