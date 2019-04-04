import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class SearchArea extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            books: [],  //Contains all the book returned by the search
            searchTerm: '',
            searchButtonClick: false
        };

        //Bind the methods to the component
        this.handleSearch = this.handleSearch.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);

        document.title = "Geek Text Search";
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

    componentDidMount() {
        
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
            <div id="search-info-container" align="center">
            
                <button id="searchButton" >
                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                to={"/bookList/" + this.state.searchTerm}
                                onClick={this.searchButtonClicked}
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