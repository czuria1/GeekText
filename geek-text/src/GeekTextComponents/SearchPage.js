import React, {Component} from "react";
import SearchArea from "./SearchArea";
import ajaxme from "ajaxme";
import BookList from "./BookList";

class BookDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            search: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
    }

    handleSearch(event){
        this.setState({
            search: event.target.value
        })
    }

    searchButtonClicked(){
        
        if (this.state.search == ""){
            alert("Please enter a search term in the textbox");
            return;
        }

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

    //Returns the Booklist component if the books array is populated
    retrieveList() {
        
        if(this.state.books.length !== 0)
        {
            return (
                <BookList books={this.state.books}></BookList>
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