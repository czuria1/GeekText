import React, { Component } from 'react';
import BookList from './BookList';
import ajaxme from "ajaxme";

class SearchArea extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            books: []  //Contains all the book returned by the search
        };

        //Bind the methods to the component
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
        this.showResultsNotFound = this.showResultsNotFound.bind(this);
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
    
    searchButtonClicked(){

        var searchText = document.getElementById("searchText").value;
        
        //If nothing is in the search box
        if (searchText === ""){
            alert("Please enter a search term in the textbox");
            return;
        }

        //Used to connect to the server
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getSearchInfo&searchParam=' + `${searchText}`,
            success: function(XMLHttpRequest) {
                //If the search returns no result from the db
                if (XMLHttpRequest.responseText === "0 results")
                {
                    this.showResultsNotFound();
                    return;
                }
                
                this.setState({
                    books: JSON.parse(XMLHttpRequest.responseText)
                })
            }.bind(this),
            error: function(XMLHttpRequest) {
                console.log('error', XMLHttpRequest);
            },
            abort: function(XMLHttpRequest) {
                console.log('abort', XMLHttpRequest);
            },
            loadstart: function(XMLHttpRequest) {
            },
            progress: function(XMLHttpRequest) {
            }
        });
    }

    showResultsNotFound() {
        var rootDiv = document.getElementById("search-info-container");
        var noResultsContainer = document.createElement('div');
        noResultsContainer.id = "noResultsContainer";
        var noResults = document.createElement('p');
        var diffSearch = document.createElement('p');
        var searchByAuthorTip = document.createElement('p');
        var searchByTitleTip = document.createElement('p');
        var searchByGenreTip = document.createElement('p');
        noResults.appendChild(document.createTextNode("No titles found (0 hits) - Try these tips:"));
        diffSearch.appendChild(document.createTextNode("Try a different kind of search:"));
        searchByAuthorTip.appendChild(document.createTextNode("Do a browse search by title, typing just the first few letters of the title."));
        searchByTitleTip.appendChild(document.createTextNode("Do a browse search by author, typing just the first few letters of the author's first or last name."));
        searchByGenreTip.appendChild(document.createTextNode("Do a browse search by genre, typing just the first few letters of the genre"));
        noResultsContainer.appendChild(noResults);
        noResultsContainer.appendChild(diffSearch);
        noResultsContainer.appendChild(searchByAuthorTip);
        noResultsContainer.appendChild(searchByTitleTip);
        noResultsContainer.appendChild(searchByGenreTip);
        rootDiv.appendChild(noResultsContainer);
    }

    render() {
        return(
            <div id="search-info-container" align="center">
                <button id="searchButton" onClick={this.searchButtonClicked}>Search...</button>
                <input onFocus={this.setTextBoxListner} id="searchText" type="text" placeholder = "Author, Title, Genre ... "/>
                <button id="topSearch">Top Sellers</button>
                <div id="listContainer">
                    <BookList books={this.state.books}></BookList>
                </div>
                
            </div>
        )
    }
}

export default SearchArea;