import React, {Component} from "react";
import SearchArea from "./SearchArea";
import ajaxme from "ajaxme";
import BookList from "./BookList";

class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],  //Contains all the book returned by the search
            search: ''  //Contains the key search term to obtain the books
        };

        //Bind the methods to the component
        this.handleSearch = this.handleSearch.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
        this.resetBookState = this.resetBookState.bind(this);
    }

    //Sets the state "search" to anything the user types in the search box
    handleSearch(event){
        this.setState({
            search: event.target.value
        })
    }

    searchButtonClicked(){

        //window.open("http://google.com");

        //If nothing is in the search box
        if (this.state.search === ""){
            alert("Please enter a search term in the textbox");
            return;
        }

        //Used to connect to the server
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getSearchInfo&searchParam=' + `${this.state.search}`,
            success: function(XMLHttpRequest) {
                //If the search returns no result from the db
                if (XMLHttpRequest.responseText === "0 results")
                {
                    this.showResultsNotFound();
                    return;
                }
                console.log(XMLHttpRequest.responseText);
                
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
        var rootDiv = document.getElementById("book-info-container");
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
        rootDiv.appendChild(noResults);
        rootDiv.appendChild(diffSearch);
        rootDiv.appendChild(searchByAuthorTip);
        rootDiv.appendChild(searchByTitleTip);
        rootDiv.appendChild(searchByGenreTip);
    }

    //Sets the books array to empty to prevent continuos rendering of the booklist
    resetBookState() {
        this.setState({
            books: []
        })
    }

    //Returns the Booklist component if the books array is populated
    retrieveList() {
        
        if(this.state.books.length !== 0)
        {
            return (
                <BookList books={this.state.books} resetBookState={this.resetBookState}></BookList>
            );
        }
        else
        {
            return;
        }
    }

    render() {
        return (
             <div align="center" id="book-info-container">
                 {this.retrieveList()}
                
                 <div> 
                    <SearchArea handleSearch={this.handleSearch} 
                                searchButtonClicked={this.searchButtonClicked}></SearchArea>
                 </div>
             </div>
             
        );
    }
}

export default SearchPage;