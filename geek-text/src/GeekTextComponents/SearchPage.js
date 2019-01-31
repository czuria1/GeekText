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
        ajaxme.post({
            url: 'http://127.0.0.1/server.php/post',
            data: 'method=getSearchInfo&searchParam=' + `${this.state.search}`,
            success: function(XMLHttpRequest) {
                this.setState({
                    books: [XMLHttpRequest.responseText.split("\n")]
                })
                //console.log(this.state.books);
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

    render() {
        return (
             <div>
                 <SearchArea handleSearch={this.handleSearch} searchButtonClicked={this.searchButtonClicked}></SearchArea>
                 <BookList books={this.state.books}></BookList>
             </div>
        );
    }
}

export default BookDetails;