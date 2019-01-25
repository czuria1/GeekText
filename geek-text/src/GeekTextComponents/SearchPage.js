import React, {Component} from "react";
import SearchArea from "./SearchArea";
import request from 'superagent'
import BookDetailList from "./BookDetailList";

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
        request.get("https://www.googleapis.com/books/v1/volumes")
            .query({ q: this.state.search, maxResults: 40})
            .then((data) => {
                this.setState({
                    books: [...data.body.items]
                })
                console.log(data);
                
            })
    }

    render() {
        return (
             <div>
                 <SearchArea handleSearch={this.handleSearch} searchButtonClicked={this.searchButtonClicked}></SearchArea>
                 <BookDetailList books={this.state.books}></BookDetailList>
             </div>
        );
    }
}

export default BookDetails;