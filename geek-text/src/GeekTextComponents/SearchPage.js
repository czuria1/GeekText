import React, {Component} from "react";
import SearchArea from "./SearchArea";
import ajaxme from "ajaxme";
import BookList from "./BookList";

class BookDetails extends Component {

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
        //If nothing is in the search box
        if (this.state.search == ""){
            alert("Please enter a search term in the textbox");
            return;
        }

        //Used to connect to the server
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getSearchInfo&searchParam=' + `${this.state.search}`,
            success: function(XMLHttpRequest) {
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
             <div id="book-info-container">
                 {this.retrieveList()}
                 <SearchArea handleSearch={this.handleSearch} searchButtonClicked={this.searchButtonClicked}></SearchArea>
             </div>
        );
    }
}

export default BookDetails;